import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/Email.service';
import {  DialogRef } from '@progress/kendo-angular-dialog';
@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.css']
})
export class EmailDetailComponent {
  emailForm!: FormGroup;
  emailList:any[]=[]
  constructor(public dialog: DialogRef,private fb: FormBuilder,private emailService:EmailService,) {
  }
  ngOnInit(): void {
    this.initForm();
     }
     callList(e:any){
      this.emailService.GetEmailsList(e.target.value).subscribe(data=>this.emailList=data)
    }
  initForm(){
    this.emailForm = new FormGroup({
      message: new FormControl("", Validators.required),
      to: new FormControl('', [Validators.required,Validators.email]),
      sujet: new FormControl('', Validators.required),
      option: new FormControl('',),
    }); 
  }
  cancel(){
    this.dialog.close()
    }
    save(){ this.dialog.close(this.emailForm)}
}
