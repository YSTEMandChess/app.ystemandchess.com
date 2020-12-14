[![npm version](https://badge.fury.io/js/ngx-agora.svg)](https://badge.fury.io/js/ngx-agora)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# ngx-agora

> Angular wrapper for the Agora Web RTC client from [Agora.io](https://www.agora.io/en/)

## Credits

This package is an enhanced implementation of the [angular-agora-rtc](https://github.com/AgoraIO-Community/Angular-Agora-RTC) library by [@Only1MrAnderson](https://github.com/Only1MrAnderson).

---

## Installation

Install ngx-agora via the `ng add` command:

```bash
ng add ngx-agora
```

## Setup

In your app's main module, import `NgxAgoraModule` and `AgoraConfig` from `ngx-agora` and add the module to the imports array. Create an instance of `AgoraConfig` and set `AppID` equal to the the value found in your project list on Agora.io.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxAgoraModule, AgoraConfig } from 'ngx-agora';

import { AppComponent } from './app.component';

const agoraConfig: AgoraConfig = {
  AppID: '1239021930912039-02193',
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxAgoraModule.forRoot(agoraConfig)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

You can then inject the `NgxAgoraService` into your components constructor and call `createClient()` to create the broadcast client object
**Note:** The broadcast client object can only be created once per call session.

```ts
import { NgxAgoraService } from 'ngx-agora';
...
  constructor(
    private agoraService: NgxAgoraService,
  ) {
    this.agoraService.createClient();
  }
  ...
```

Once the client is created and initialization is complete, the user can now join the session by calling `client.join()`. Pass the channel key, channel name, and user ID to the method parameters:

```ts
this.agoraService.client.join(null, '1000', null, (uid) => {});
```

- Channel key: String used for broadcast security. For low security requirements, pass null as the parameter value.
- Channel name: String that provides a unique channel name for the Agora session. This should be a numerical value for the Web SDK. The sample app uses channel.value (the value from the Channel UI text field).
- User ID: The user ID is a 32-bit unsigned integer ranging from 1 to (2^32-1). If you set the user ID to null, the Agora server allocates a user ID and returns it in the onSuccess callback. If you decide to enter a specific user ID, make sure the integer is unique or an error will occur.

**Note:** Users in the same channel can talk to each other, but users with different app IDs cannot call each other even if they join the same channel.

Once this method is called successfully, the SDK triggers the callback with the user id as the parameter.

### Create and Manage a Stream

- Host a Stream
- Create a Stream
- Set the Stream Video Profile
- Set the Stream Event Listeners for Camera and Microphone Access

#### Host a Stream

If a user who has joined the stream will act as the host, the app must create a stream.

#### Create a Stream

If the user is a host, start the stream using the `this.agoraService.createStream()` method. The sample app passes in an object with the following properties:
`this.localStream = this.agoraService.createStream(uid, true, null, null, true, false);`

- streamID: The stream ID. Normally the stream ID is set as the user ID, which can be retrieved from the client.join() callback.
- audio: Indicates if this stream contains an audio track.
- cameraId: (Optional, defaults to first camera device found) All available video devices can be found by calling `agoraService.videoDevices`
- microphoneId: (Optional, defaults to the first audio device found) All available audio devices can be found by calling `agoraService.audioDevices`
- video: Indicates if this stream contains a video track.
- screen: Indicates if this stream contains a screen sharing track. Currently screen sharing is only supported by the Google Chrome Explorer.

The createStream object is set up for additional optional attributes. See the Agora API documentation for more information.

#### Set the Stream Video Profile

If the user is a host, the video profile must be set. The sample app sets the video profile to 720p_3, which represents a resolution of 1280x720, frame rate (fps) of 30, and a bitrate (kbps) of 1710. See the Agora API documentation for additional video profile options.
`localStream.setVideoProfile('720p_3');`

#### Set the Stream Event Listeners for Camera and Microphone Access

Once the stream has been set up and configured, the sample app adds event listeners using the `localStream.on()` method to check for the user's microphone and camera permissions. These event listeners are used for debugging and to send alerts to request permissions. The sample app uses console logs to check if access to the camera and microphone was allowed or denied by the user.

```ts
// The user has granted access to the camera and mic.
this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
  console.log('accessAllowed');
});
// The user has denied access to the camera and mic.
this.localStream.on(StreamEvent.MediaAccessDenied, () => {
  console.log('accessDenied');
});
```

Next, the sample app initializes the stream by calling the `localStream.init()` method. Once initialized, the stream's host publishes the stream using the `client.publish()` method.

```ts
this.localStream.init(
  () => {
    console.log('getUserMedia successfully');
    this.localStream.play('agora_local');
    this.agoraService.client.publish(this.localStream, (err) =>
      console.log('Publish local stream error: ' + err)
    );
    this.agoraService.client.on(ClientEvent.LocalStreamPublished, (evt) =>
      console.log('Publish local stream successfully')
    );
  },
  (err) => console.log('getUserMedia failed', err)
);
```

#### Set-up Client Error Handling

Passing error into the `client.on()` method will return the error type `err.reason`. The sample app uses this error type for debugging and re-invoking methods that failed.

Since the Channel Key has an expiration, the sample app checks for the error `DYNAMIC_KET_TIMEOUT` in the `onFailure` callback. It then renews the channel key using the `client.renewChannelKey()` method.

**Note:** If the channel key is not renewed, the communication to the SDK will disconnect.

```ts
this.agoraService.client.on(ClientEvent.Error, (err) => {
  console.log('Got error msg:', err.reason);
  if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
    this.agoraService.client.renewChannelKey(
      '',
      () => {
        console.log('Renew channel key successfully');
      },
      (err) => {
        console.log('Renew channel key failed: ', err);
      }
    );
  }
});
```

#### Add a Stream to the Client

The stream-added event listener detects when a new stream is added to the client. The sample app subscribes the newly added stream to the client after a new stream is added to the client

```ts
this.agoraService.client.on(ClientEvent.RemoteStreamAdded, (evt) => {
  const stream = evt.stream as Stream;
  this.agoraService.client.subscribe(stream, (err) => {
    console.log('Subscribe stream failed', err);
  });
});
```

#### Subscribe a Stream to the Client and Add to the DOM

The sample app uses the `stream-subscribed` event listener to detect when a new stream has been subscribed to the client, and to retrieve its stream ID using the `stream.getId()` method.

```ts
this.agoraService.client.on(ClientEvent.RemoteStreamSubscribed, (evt) => {
  const stream = evt.stream as Stream;
  if (!this.remoteCalls.includes(`agora_remote${stream.getId()}`))
    this.remoteCalls.push(`agora_remote${stream.getId()}`);
  setTimeout(() => stream.play(`agora_remote${stream.getId()}`), 1000);
});
```

Once the stream has been added to the `remoteCalls` array, the sample app sets a one second timeout to allow the change detection to run and render the new div. Then to play the stream we call the stream.play() method, passing in the string agora_remote followed by the stream ID.

#### Remove a Stream from the Client

If the stream is removed from the client, the `stream-removed` event listener is called, the sample app stops the stream from playing by calling the `stream.stop()` method. We then remove the stream from the `remoteCalls` array using the `filter()` method.

```ts
this.agoraService.client.on(ClientEvent.RemoteStreamRemoved, (evt) => {
  const stream = evt.stream as Stream;
  stream.stop();
  this.remoteCalls = this.remoteCalls.filter(
    (call) => call !== `#agora_remote${stream.getId()}`
  );
  console.log(`Remote stream is removed ${stream.getId()}`);
});
```

#### Remove a Peer from the Client

When the sample app detects that a peer leaves the client using the `peer-leave` event listener, it stops the stream from playing. We then remove the stream from the `remoteCalls` array using the `filter()` method.

```ts
this.agoraService.client.on(ClientEvent.PeerLeave, (evt) => {
  const stream = evt.stream as Stream;
  if (stream) {
    stream.stop();
    this.remoteCalls = this.remoteCalls.filter(
      (call) => call === `#agora_remote${stream.getId()}`
    );
    console.log(`${evt.uid} left from this channel`);
  }
});
```

#### Leave a Channel

The `client.leave()` method removes the user from the current video call (channel). The sample app checks if the action succeeds or fails using the `onSuccess` and `onFailure` callbacks.

```ts
  leave() {
    this.agoraService.client.leave(() => {
      console.log("Leavel channel successfully");
    }, (err) => {
      console.log("Leave channel failed");
    });
  }
```
