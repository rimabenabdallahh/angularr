import { Component} from '@angular/core';
import { FormGroup} from '@angular/forms';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { pencilIcon } from '@progress/kendo-svg-icons';
import { Users } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/login.service';
import { UserDetailsComponent } from '../Dossier/manageTasks/dashboard-tasks/tab-user/user-details/user-details.component';
import { UsersService } from 'src/app/services/users.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user:Users | null=null;
  userInfo:any =null;
  userForm!: FormGroup;
  avatar:string=""
  public icons = { edite:pencilIcon };
 constructor(private dialogService: DialogService,private account:AccountService,private userService:UsersService){
  this.user=this.account.userValue;}
  ngOnInit(): void {
    console.log(this.user);
    
   if(this.user?.role=="admin"){
    this.userInfo=new Users()
    this.userInfo.email=this.user.email;
    this.userInfo.motDePasse=this.user.motDePasse
    this.avatar="A";
   }else{
    this.getData()

   }
  }
  getData(){
    this.userService.GetUserByIdRole(this.user?.id,this.user?.role).subscribe(data=>
      {
        this.userInfo=data;
        this.userInfo.motDePasse=this.user?.motDePasse;
        this.avatar=data.nom[0].toUpperCase()+data.prenom[0].toUpperCase()
      })
  }
  open(){
     var dialog: DialogRef = this.dialogService.open({
       title: "Mes informations",
       content: UserDetailsComponent,
       width: "40%",
     });
     const userInfo=dialog.content.instance;
     userInfo.role=this.user?.role
     userInfo.user=this.userInfo
     dialog.result.subscribe((result) => {
       if (!(result instanceof DialogCloseResult)) {
        if(userInfo.userForm.valid){
          let userr=new Users();
           userr=userInfo.userForm.value;
           userr.role=this.user?.role;
          userr.id=this.user?.id
         this.userService.editerrUser(userr).subscribe(data=>{ this.getData();Swal.fire('Valide', "Votre profil est modifié", 'success');})
          

          
      }
      
    }

    });
  }
}