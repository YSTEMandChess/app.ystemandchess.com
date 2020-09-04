import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  private socketEndpoint = "http://52.249.251.163:8400";

  constructor() {
    this.socket = io(this.socketEndpoint);
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
      })
    });
  }
}
