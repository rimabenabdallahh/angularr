import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogContentBase, DialogRef } from '@progress/kendo-angular-dialog';
import { ItemModel } from 'src/app/models/formation.model';
import { AttestationService } from 'src/app/services/Attestation.service';
import { EmailService } from 'src/app/services/Email.service';

@Component({
  selector: 'app-attestation-detail',
  templateUrl: './attestation-detail.component.html',
  styleUrls: ['./attestation-detail.component.css']
})
export class AttestationDetailComponent extends DialogContentBase implements OnInit {
  partcipants:ItemModel[]=[]
  attestationForm!: FormGroup;
  @Input() attestation : any=null;
  selectedFiles?: FileList;
  currentFile?: File;
  constructor(public override dialog: DialogRef ,private attestationService:AttestationService){super(dialog)}
  ngOnInit(): void {
    this.initForm(this.attestation)
    if(!this.attestation){
      console.log('');
      
      this.attestationForm.controls["contenu"].setValidators(Validators.required)
    }
   
    this.attestationService.GetParticipants().subscribe(data=>this.partcipants=data)
  }
  initForm(data:any|null){
    this.attestationForm = new FormGroup({
      contenu: new FormControl(null),
      participant:new FormControl(data?.participant,[Validators.required]),
      
    });
  }
  cancel(){
    this.dialog.close()
    }
    save(){ this.dialog.close(this.attestationForm)}
  
    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
       if (file) {
            this.currentFile = file;
            this.attestationForm.controls["contenu"].setValue(this.currentFile)
    }
    this.selectedFiles = undefined;
    }
    }

}


