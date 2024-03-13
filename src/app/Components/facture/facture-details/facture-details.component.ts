import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DialogContentBase, DialogRef } from '@progress/kendo-angular-dialog';
import { Facture } from 'src/app/models/facture.model';
import { FactureService } from 'src/app/services/facture.services';

@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styleUrls: ['./facture-details.component.css']
})
export class FactureDetailsComponent extends DialogContentBase implements OnInit {
  factForm!: FormGroup;
  @Input() facture: Facture | null = null;
  clientList: any[] = [];

  constructor(public override dialog: DialogRef, private factService: FactureService) {
    super(dialog);
    
  }

  ngOnInit(): void {
    this.initForm(this.facture);
    if (!this.facture) {
      this.factForm.controls['contenu']?.setValidators(Validators.required); 
    }
    this.getClientList();
  }

  initForm(data: Facture | null) {
    this.factForm = new FormGroup({
      client: new FormControl(data?.client, [Validators.required]),
      formation: new FormControl(null) 
    });
  }

  cancel() {
    this.dialog.close();
  }

  save() {
    this.dialog.close(this.factForm);
  }

  getClientList() {
    this.factService.GetAllClient().subscribe(data => this.clientList = data);
  }
  
  selectFile(event: any): void {
    const selectedFiles: FileList = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const file: File = selectedFiles[0];
      this.factForm.controls['client'].setValue(file);
    }
  }
  
}