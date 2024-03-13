import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { EmailService } from 'src/app/services/Email.service';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { Email } from 'src/app/models/email.model';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  opened =false
  noteForm!: FormGroup;
  option : any
  Email: any[]=[]
  emailList: any[]=[]
  id:any
  gridData:any[] =[];
  constructor(private fb: FormBuilder,private emailService:EmailService,private dialogService: DialogService) {
  }
  ngOnInit(): void {
    this.getGridData()
     }
     getGridData(){
  
       this.emailService.GetAllEmails().subscribe(data=>this.gridData=data)
      }

  open(){
    const dialog: DialogRef = this.dialogService.open({
      title: "Envoyer un email",
      content: EmailDetailComponent,
      width: "60%",
    });
    const emailInfo=dialog.content.instance;
    dialog.result.subscribe((result) => {
      if (!(result instanceof DialogCloseResult)) {
        if(emailInfo.emailForm.valid){
          let email=new Email();
          email=emailInfo.emailForm.value;
          this.emailService.ajouterEmail(email).subscribe(data=>{ this.getGridData()}) 
          
      }
    }

    });
  }
  
}
