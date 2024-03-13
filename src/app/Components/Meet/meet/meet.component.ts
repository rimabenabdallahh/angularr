import { Component, OnInit} from '@angular/core'; 
import { FormControl, FormGroup} from '@angular/forms';


@Component({
    selector: 'app-meet',
    templateUrl: './meet.component.html',
    styleUrls: ['./meet.component.css']
})
export class MeetComponent implements OnInit {
    roomForm!: FormGroup;  

    generateRoomName() {
        var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var length = 10;
        var result = '';
        for (var i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    ngOnInit(): void {
        this.initForm();

    }
    initForm() {
        this.roomForm = new FormGroup({
          fullRoomName: new FormControl("vpaas-magic-cookie-b34033c7d1024d40a46ed0d08c0a945f/"+this.generateRoomName()),
      });
      
    }

}