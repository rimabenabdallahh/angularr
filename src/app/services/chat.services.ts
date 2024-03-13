import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';         
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../models/message.model';
import { Observable, Subject, map } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


   private  connection: any = new signalR.HubConnectionBuilder().withUrl(environment.hubConnectionURL,{
                                                                      skipNegotiation: true,
                                                                      transport: signalR.HttpTransportType.WebSockets
                                                              })   // mapping to the chathub as in startup.cs
                                         .configureLogging(signalR.LogLevel.Information)
                                         .build();
                                       
 


  private receivedMessageObject: Message = new Message();
  private sharedObj = new Subject<Message>();

  constructor(private http: HttpClient) { 
    this.connection.onclose(async () => {
      await this.start();
    });
   this.connection.on("ReceiveOne", (user: string, message: string) => { this.mapReceivedMessage(user, message); });
   this.start();                 
  }


  // Start the connection
  public async start() {
    try {
      await this.connection.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    } 
  }

  private mapReceivedMessage(user: string, message: string): void {
    this.receivedMessageObject.user = user;
    this.receivedMessageObject.msgText = message;
    this.sharedObj.next(this.receivedMessageObject);
 }
 public getMessages(): Observable<Message[]> {
  return this.http.get<Message[]>(`${environment.apiUrl}/api/Chat`, this.prepareHeader()).pipe(
    map(res => res as Message[])
  );
}
 



  // Calls the controller method
  public broadcastMessage(msgDto: any) {
    return this.http.post<any>(
      `${environment.apiUrl}/api/Chat`,
      msgDto
    ).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
  

  public retrieveMappedObject(): Observable<Message> {
    return this.sharedObj.asObservable();
  }

  protected prepareHeader(): Object {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    return { headers: headers };
}


}
