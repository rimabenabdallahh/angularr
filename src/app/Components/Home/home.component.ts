import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/login.service';
import { Users } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    user:Users | null=null;
    userInfo:any
    userName:string=""
    
  
    constructor(private account:AccountService,private userService:UsersService) {
      this.user=this.account.userValue;
      console.log(this.user?.nom)
    }  
    ngOnInit(): void {
   
      this.getData()
    }
    getData(){
      this.userService.GetUserByIdRole(this.user?.id,this.user?.role).subscribe(data=>
        {this.userInfo=data;
          if(this.user?.role=="admin")
          {this.userName="Administrateur"}
          else
          {this.userName=data.nom+" "+data.prenom}
        })
    }
  
}
