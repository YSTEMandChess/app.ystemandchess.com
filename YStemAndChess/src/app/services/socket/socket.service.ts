import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket;

  constructor() {
    const socket = io(environment.urls.chessServer, {
      reconnection: true,
      timeout: 30000,
    });
    // this.socket = io.connect(environment.urls.chessServer, {
    //   transports: ['websocket'],
    // });
    this.socket = socket;

    this.socket.connect();

    console.log('this.socket: ', this.socket);

    this.socket.on('connect', function () {
      // socket.close();
      console.log('connected');

      socket
        .on('authenticated', () => {
          console.log('authorized');
          // socket.close();
        })
        .on('unauthorized', (msg) => {
          console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
        });

      socket.on('get sessionID', (data) => {
        console.log('sessionID: ', data.sessionId);
      });
    });
    console.log('this.socket ====>: ', this.socket);
  }

  public emitMessage(eventName: string, message: string) {
    console.log('this.socket: ', this.socket);
    this.socket.emit(eventName, message);
    console.log('this.socket', this.socket);
  }

  public listen(eventName: string) {
    return new Observable((subscriber) => {
      console.log('subscriber: ', subscriber);
      this.socket.on(eventName, (data) => {
        console.log('data: ', data);
        console.log('this.socket: ', this.socket);
        subscriber.next(data);
      });
    });
  }
}
