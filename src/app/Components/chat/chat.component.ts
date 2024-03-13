import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { Users } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.services';
import { AccountService } from 'src/app/services/login.service';
import { DatePipe } from '@angular/common';
import { UsersService } from 'src/app/services/users.services';
providers: [DatePipe]

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  msgDto: Message = new Message();
  msgInboxArray: Message[] = [];
  user:Users | null=null;
  userInfo:any
  userName:any;

  constructor(private chatService: ChatService,private account:AccountService,private userService:UsersService) {
    this.user=this.account.userValue;
    console.log("user",this.user);
   }

 ngOnInit(): void {
  this.getData();
  
  this.chatService.retrieveMappedObject().subscribe((receivedObj: Message) => {
    this.addToInbox(receivedObj);
  });


    this.chatService.getMessages().subscribe(
      (messages: Message[]) => {
        this.msgInboxArray= messages;
      },
      (error: any) => {
        console.error('Error fetching messages:', error);
      }
    );
}

getData(){
  this.userService.GetUserByIdRole(this.user?.id,this.user?.role).subscribe(data=>
    {this.userInfo=data;
      if(this.user?.role=="admin")
      {this.msgDto.user="Administrateur"}
      else
      {this.msgDto.user=data.nom+" "+data.prenom}
    })
    console.log("useName",this.msgDto.user)
}

  send(): void {
    if (!this.msgDto.user || !this.msgDto.msgText) {
      window.alert("Both fields are required");
      return;
    } else {
      console.log(this.msgDto);
      this.chatService.broadcastMessage(this.msgDto);
    }
  }

  addToInbox(obj: Message): void {
    this.msgInboxArray.push(obj);
    
  }
}