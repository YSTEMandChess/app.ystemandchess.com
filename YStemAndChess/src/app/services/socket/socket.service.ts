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
    this.socket = io.connect(environment.urls.chessServer, {
      transports: ['websocket'],
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
