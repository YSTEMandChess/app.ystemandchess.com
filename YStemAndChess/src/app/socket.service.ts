import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket;
  private socketEndpoint = environment.urls.chessServerURL;

  constructor() {
    this.socket = io.connect(this.socketEndpoint);
  }

  public emitMessage(eventName: string, message: string) {
    this.socket.emit(eventName, message);
  }

  // Example Implmentation of function:
  /*
  this.webSocket.listen("example").subscribe((data) => {
    console.log(data);
    // I have recieved the data here and will now do something.
  })
  */
  public listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
}
