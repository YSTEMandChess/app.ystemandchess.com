import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  private socketEndpoint = "http://127.0.0.1:3000"

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
