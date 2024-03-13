import { Component} from '@angular/core';
import { UsersService } from 'src/app/services/users.services';
import { Users } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/login.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent {

  public dialogThemeColor: any = "primary";
  gridData:any[] =[];
  user:Users | null=null;
  constructor(private userService:UsersService,private account:AccountService) {  this.user=this.account.userValue; }
  ngOnInit(): void {
    this.getGridData();
 
   }
   getGridData(){

        if(this.user?.role=='client'){
          // get participant by client id
          this.userService.GetParticipantByClientId(this.user.id).subscribe(data=>this.gridData=data)
        }
        if(this.user?.role=="formateur"){
          this.userService.GetParticipantsList().subscribe(data=>this.gridData=data)
        }
        

     
   }
   onSubmit() {
   }
}
