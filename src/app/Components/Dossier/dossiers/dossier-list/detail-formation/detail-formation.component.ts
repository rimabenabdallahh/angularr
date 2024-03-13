import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogContentBase, DialogRef } from '@progress/kendo-angular-dialog';
import { Formation, ItemModel } from 'src/app/models/formation.model';
import { FormationService } from 'src/app/services/formation.services';
import { FormatSettings } from '@progress/kendo-angular-dateinputs';


@Component({
  selector: 'app-detail-formation',
  templateUrl: './detail-formation.component.html',
  styleUrls: ['./detail-formation.component.css']
})
export class DetailFormationComponent extends DialogContentBase implements OnInit {
  formationForm!: FormGroup;
  @Input() formation : Formation | null=null;
  public min: Date = new Date(2023, 0, 1);
  public max: Date = new Date(2029, 11, 31);
  formateurList:ItemModel[]=[]
  public format: FormatSettings = {
    displayFormat: "dd/MM/yyyy HH:mm",
    inputFormat: "dd/MM/yy HH:mm",
  };
 constructor(public override dialog: DialogRef,private formationService:FormationService,
  ){super(dialog)}

  ngOnInit(): void {
    this.initForm(this.formation);
    if(this.formation){
      this.formationForm.controls['debut'].setValue(this.adjustTimezoneOffset(new Date(this.formation.debut)))
      this.formationForm.controls['fin'].setValue(this.adjustTimezoneOffset(new Date(this.formation.fin)))
    }
    this.getFomateursList()
  }

 initForm(data:Formation | null){
  this.formationForm = new FormGroup({
    code: new FormControl(data?.code,[Validators.required]),
    theme: new FormControl(data?.theme,[Validators.required]),
    lien: new FormControl(data?.lien),
    debut:new FormControl(null,[Validators.required]),
    fin: new FormControl(null,[Validators.required]),
    duree:new FormControl(data?.duree,[Validators.required,Validators.pattern("^[0-9]*$")]),
    cout:new FormControl(data?.cout,[Validators.required,Validators.pattern("^[0-9]*$")]),
    formateur:new FormControl(data?.formateur),
    
  });
}
cancel(){
this.dialog.close()
}
save(){ this.dialog.close(this.formationForm)}

getFomateursList(){
this.formationService.GetAllFormateur().subscribe(data=>this.formateurList=data)
}
adjustTimezoneOffset(date: Date): Date {
  const timezoneOffsetTunisia = -120; // Tunisia's time zone offset in minutes (UTC+1)
  const timezoneOffsetCurrent = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() + (timezoneOffsetCurrent - timezoneOffsetTunisia) * 60000);
  console.log(date.getTime() );
  return adjustedDate;
  
}
}