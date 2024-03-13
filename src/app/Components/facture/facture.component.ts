import { DialogCloseResult, DialogRef, DialogService, DialogThemeColor, } from '@progress/kendo-angular-dialog';
import { Component} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { DialogAnimation } from '@progress/kendo-angular-dialog';
import { plusIcon } from '@progress/kendo-svg-icons';
import { FactureService } from 'src/app/services/facture.services';
import { Facture } from 'src/app/models/facture.model';
import { Users } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/login.service';
import { ButtonFillMode } from '@progress/kendo-angular-buttons';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FactureDetailsComponent } from './facture-details/facture-details.component';


@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent {
  public addDialogOpened = false;
  public editDialogOpened = false;
  public animation: boolean | DialogAnimation = {};
  public dialogThemeColor: any = "primary";
  public icons = { trash: plusIcon };
  public user:Users | null=null;
  pdfUrl!: SafeResourceUrl;
  gridData:any[] =[];
  public fillMode: ButtonFillMode = "flat";
  constructor(private fb: FormBuilder,private factureService:FactureService,private dialogService: DialogService ,private accountService:AccountService,private sanitizer: DomSanitizer) { this.user=this.accountService.userValue }
  

  ngOnInit(): void {
   this.getGridData();

  }
  getGridData(){
   
        this.factureService.GetFactureList().subscribe(data=>this.gridData=data)
          }

edit(item:any){}
  public delete(id: string): void {
  this.factureService.delete(id).subscribe(data=>{this.getGridData()})
  }
  saveByteArray(item: any) {
    if (item.type === 'pdf') {
      const byteCharacters = atob(item.factContent);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } else {
      const byteCharacters = atob(item.factContent);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/' + item.type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = item.name + '.' + item.type;
      link.click();
      URL.revokeObjectURL(url);
    }
  }

  openFactDetails(dataItem:Facture |null){
    const dialog: DialogRef = this.dialogService.open({
      title: dataItem==null?"Ajouter une Facture":"Editer une Facture",
      content: FactureDetailsComponent ,
      width: "50%",
    });
    const factInfo=dialog.content.instance;
    factInfo.facture=dataItem
    dialog.result.subscribe((result) => {
      if (!(result instanceof DialogCloseResult)) {
        if(factInfo.factForm.valid){
         var  facture=factInfo.factForm.value;
          if(dataItem==null){
          this.factureService.ajouterFacture(facture.client.id,facture.contenu).subscribe(data=>{this.getGridData();Swal.fire('Valide', "Ajout effectué avec succés", 'success');})
      } 
      else{
        facture.id=dataItem.id;
       this.factureService.editFacture(facture).subscribe(data=>{this.getGridData();Swal.fire('Valide', "Modification effectué avec succés", 'success');})
       

      }
  } 
   
}

});
}
 
}


