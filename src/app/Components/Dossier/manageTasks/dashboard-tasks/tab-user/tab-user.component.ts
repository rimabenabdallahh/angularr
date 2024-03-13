import { DialogCloseResult, DialogRef, DialogService, DialogThemeColor, } from '@progress/kendo-angular-dialog';
import { Component, Input} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { DialogAnimation } from '@progress/kendo-angular-dialog';
import { plusIcon } from '@progress/kendo-svg-icons';
import { UsersService } from '../../../../../services/users.services';
import { Users } from 'src/app/models/user.model';
import { UserDetailsComponent } from './user-details/user-details.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user-tab',
  templateUrl: './tab-user.component.html',
  styleUrls: ['./tab-user.component.css']
})
export class tabUserComponent {

 // public addDialogOpened = false;
 // public editDialogOpened = false;
  public animation: boolean | DialogAnimation = {};
  public dialogThemeColor: any = "primary";
  @Input() userRole: string = ""; 
  public icons = { trash: plusIcon };
  gridData:Users[] =[];
  constructor(private fb: FormBuilder,private userService:UsersService,private dialogService: DialogService) {  }

  ngOnInit(): void {
    console.log(this.userRole);
    
   this.getGridData();

  }
  getGridData(){
    if(this.userRole=='formateur'){
      this.userService.GetFormateursList().subscribe(data=>this.gridData=data)
    }
      else if(this.userRole=='participant')
{        this.userService.GetParticipantsList().subscribe(data=>this.gridData=data)
}       else if(this.userRole=='client')
{       this.userService.GetClientsList().subscribe(data=>this.gridData=data)
}
else{
  this.userService.GetAdminList().subscribe(data=>this.gridData=data)
}
    
  }
  onSubmit() {
  }




  public deleteUser(id: string): void {
  this.userService.delete(id).subscribe(data=>{this.getGridData()})
  }
 
  

  openUserDetails(dataItem:Users |null){
    var dialog: DialogRef = this.dialogService.open({
      title: dataItem==null?"Ajouter un "+ this.userRole:"Editer le "+ this.userRole,
      content: UserDetailsComponent,
      width: "50%",
    });
    var userInfo=dialog.content.instance;
    userInfo.user=dataItem;
    console.log(dataItem);
    
    userInfo.role=this.userRole
    dialog.result.subscribe((result) => {
      if (!(result instanceof DialogCloseResult)) {
        if(userInfo.userForm.valid){
          let user=new Users();
          user=userInfo.userForm.value;
          user.role=this.userRole;
          if(dataItem==null){
            this.userService.ajouterUser(user).subscribe(data=>{this.getGridData();Swal.fire('Valide', "Ajout effectué avec succés", 'success');})
          }
          else{
            user.id=dataItem.id;
            this.userService.editerrUser(user).subscribe(data=>{this.getGridData();Swal.fire('Valide', "Modification effectué avec succés", 'success');})

          }
          
      } 
      
      
    }

    });
  }
}



