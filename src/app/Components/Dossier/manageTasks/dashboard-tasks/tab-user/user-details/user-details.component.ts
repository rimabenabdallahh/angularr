import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {DialogRef } from '@progress/kendo-angular-dialog';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { Users } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.services';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent  implements OnInit {
  userForm!: FormGroup;
  @Input() user : Users | null=null;
  @Input() role: string="";
  clientList:any=[];
 constructor(protected dialog:DialogRef ,private usersService:UsersService){
  
 }
 @ViewChild("password") public textbox!: TextBoxComponent;
 
 public ngAfterViewInit(): void {  
  this.textbox.input.nativeElement.type = "password";
    
 }
  ngOnInit(): void {
    console.log("role",this.user)
    if(this.role=="participant"){
      this.getClientList();
    }
    this.initForm(this.user);
    if(this.role=="client" ||this.role=="admin" ){
      //this.userForm.get("prenom")?.setValue(" ")
      this.userForm.get('prenom')?.clearValidators();
      this.userForm.get('prenom')?.updateValueAndValidity();
    }
    if(this.role=="admin"){
      this.userForm.get('nom')?.clearValidators();
      this.userForm.get('nom')?.updateValueAndValidity();
      this.userForm.get('telephone')?.clearValidators();
      this.userForm.get('telephone')?.updateValueAndValidity();
      this.userForm.get('adresse')?.clearValidators();
      this.userForm.get('adresse')?.updateValueAndValidity();
    }

  }

  public toggleVisibility(): void {
    const inputEl = this.textbox.input.nativeElement;
    inputEl.type = inputEl.type === "password" ? "text" : "password"
  }

 initForm(data:Users|null){  
    this.userForm = new FormGroup({
      nom: new FormControl(data?.nom,[Validators.required]),
      prenom: new FormControl(data?.prenom,[Validators.required]),
      adresse:new FormControl(data?.adresse,[Validators.required]),
      email: new FormControl(data?.email,[Validators.required,Validators.email]),
      telephone:new FormControl(data?.telephone,[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(8),Validators.maxLength(8)]),
      motDePasse:new FormControl(data?.motDePasse,[Validators.required, Validators.pattern("^[a-zA-Z0-9]*$"),Validators.minLength(8)]),
      client: new FormControl(data?.client),
    });
  

}
getClientList(){
this.usersService.GetAllClients().subscribe(data=>this.clientList=data);
}
cancel(){
this.dialog.close()
}
save(){ this.dialog.close(this.userForm)}
}
