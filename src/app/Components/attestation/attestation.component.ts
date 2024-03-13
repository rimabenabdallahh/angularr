import { Component, OnInit } from '@angular/core';
import { DialogCloseResult, DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { AttestationDetailComponent } from './attestation-detail/attestation-detail.component';
import { saveAs } from '@progress/kendo-file-saver';
import Swal from 'sweetalert2';
import { AttestationService } from 'src/app/services/Attestation.service';
import { ButtonFillMode } from '@progress/kendo-angular-buttons';
import { AccountService } from 'src/app/services/login.service';
import { Users } from 'src/app/models/user.model';

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.css']
})
export class AttestationComponent implements OnInit {
  gridData:any[] =[];
  public fillMode: ButtonFillMode = "flat";
public user:Users | null=null;
  constructor( private dialogService: DialogService,private attestationService:AttestationService,private accountService:AccountService)
  {
    this.user=this.accountService.userValue;
  }

  ngOnInit(): void {
this.getGridData();}

getGridData(){
   
  if(this.user?.role=='admin'){
    this.attestationService.GetAttestationsList().subscribe(data=>this.gridData=data)
      }
      else if(this.user?.role=='participant'){
        this.attestationService.GetAttestationsByParticipant(this.user.id).subscribe(data=> this.gridData=data)
          }
         
    }
  edit(item:any){}
  public delete(id: string): void {
  this.attestationService.delete(id).subscribe(data=>{this.getGridData()})
  }
 
  saveByteArray(item:any) {
    var src= "data:application/"+item.documentType+";base64," +item.documentContent;
    saveAs(src, item.documentName+'.'+item.documentType);
}

openCourDetails(dataItem:any){
  const dialog: DialogRef = this.dialogService.open({
    title: dataItem==null?"Ajouter une attestation":"Editer l'attestation",
    content: AttestationDetailComponent ,
    width: "50%",
  });
  const attestationInfo=dialog.content.instance;
  attestationInfo.attestation=dataItem
  dialog.result.subscribe((result) => {
    if (!(result instanceof DialogCloseResult)) {
      if(attestationInfo.attestationForm.valid){
        //let cour=new Cour();
       var  attestation=attestationInfo.attestationForm.value;
        if(dataItem==null){
        this.attestationService.ajouterAttestation(attestation.participant.id,attestation.contenu).subscribe(data=>
          {this.getGridData();
            Swal.fire('Valide', "Ajout effectué avec succés", 'success');})
    } 
    else{
      attestation.id=dataItem.id;
     this.attestationService.editAttestation(attestation).subscribe(data=>{
      this.getGridData();
      Swal.fire('Valide', "Modification effectué avec succés", 'success');})
     

    }
} 
 
}

});
}



}
