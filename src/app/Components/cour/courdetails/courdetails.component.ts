import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogContentBase, DialogRef } from '@progress/kendo-angular-dialog';
import { Formation} from 'src/app/models/formation.model';
import { Cour,ItemModel} from 'src/app/models/cour.model';
import { CourService } from 'src/app/services/cour.services';


@Component({
  selector: 'app-courdetails',
  templateUrl: './courdetails.component.html',
  styleUrls: ['./courdetails.component.css']
})
export class CourdetailsComponent extends DialogContentBase implements OnInit {
  courForm!: FormGroup;
  @Input() cour : Cour | null=null;
  @Input() id : string="";
  formationList:ItemModel[]=[]
  selectedFiles?: FileList;
  currentFile?: File;

 
 constructor(public override dialog: DialogRef,private courService:CourService){super(dialog)}

  ngOnInit(): void {
    this.initForm(this.cour);
    if(!this.cour){
      this.courForm.controls["contenu"].setValidators(Validators.required)
    }
    this.getFormationList(this.id)
  }

 initForm(data:any|null){
  this.courForm = new FormGroup({
    titre: new FormControl(data?.titre,[Validators.required]),
    contenu: new FormControl(null),
    formation:new FormControl(data?.formation,[Validators.required]),
    
  });
}
cancel(){
this.dialog.close()
}
save(){ this.dialog.close(this.courForm)}

getFormationList(id:string){
this.courService.GetAllFormations(id).subscribe(data=>this.formationList=data)
}
selectFile(event: any): void {
  this.selectedFiles = event.target.files;
  if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);
   if (file) {
        this.currentFile = file;
        this.courForm.controls["contenu"].setValue(this.currentFile)
}
this.selectedFiles = undefined;
}
}


}
