import {Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {DialogRef, DialogService} from '@progress/kendo-angular-dialog';
import { MeetComponent } from '../meet/meet.component';
import { AccountService } from 'src/app/services/login.service';
import { Users } from 'src/app/models/user.model';
import { FormationService } from 'src/app/services/formation.services';
import { ItemModel } from 'src/app/models/formation.model';



@Component({
  selector: 'app-welcoming',
  templateUrl: './welcoming.component.html',
  styleUrls: ['./welcoming.component.css']
})
export class WelcomingComponent implements OnInit{
  
 public user:Users | null=null;

  room: string='';
  api: any;

  constructor(private dialogService: DialogService,private router: Router,private account:AccountService,
    private formationService:FormationService
    ){this.user=this.account.userValue;
    console.log("ussser",this.user);}
  meetForm!: FormGroup;
  sessionUrl:string=""
  ngOnInit(): void { 
    this.initForm();
    
    
  }initForm() {
    this.meetForm = new FormGroup({
      url: new FormControl(null,[Validators.required,Validators.pattern("vpaas-magic-cookie-b34033c7d1024d40a46ed0d08c0a945f/"+"[a-z0-9]*")]),
  });
  
}
rejoindre(){

console.log("dkhal")
 this.room=this.meetForm.get('url')?.value;
 var obj=new ItemModel()
 obj.id=this.user?.id
 obj.name=this.room
 this.formationService.IncrementParticipantNumber(obj).subscribe(data=>{this.router.navigate(['/Salle',this.room]);})
 

}
generateMeetRoom(){
  const dialog: DialogRef = this.dialogService.open({
    title: "une session est crée",
    content: MeetComponent,
    width: "50%",
  });

}



}

