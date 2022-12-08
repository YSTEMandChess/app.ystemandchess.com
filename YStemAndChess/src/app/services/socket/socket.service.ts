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
    this.socket.on('connect', function () {
      console.log('socket service connected');
    });
  }

  public emitMessage(eventName: string, message: string) {
    this.socket.emit(eventName, message);
  }

  public listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
}
