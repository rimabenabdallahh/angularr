import { DialogCloseResult, DialogRef, DialogService} from '@progress/kendo-angular-dialog';
import { Component} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { DialogAnimation } from '@progress/kendo-angular-dialog';
import { plusIcon } from '@progress/kendo-svg-icons';
import { CourService } from 'src/app/services/cour.services';
import { Cour } from 'src/app/models/cour.model';
import { Users } from 'src/app/models/user.model';
import { CourdetailsComponent } from './courdetails/courdetails.component';
import { AccountService } from 'src/app/services/login.service';
import { saveAs } from '@progress/kendo-file-saver';
import { ButtonFillMode } from '@progress/kendo-angular-buttons';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cour',
  templateUrl: './cour.component.html',
  styleUrls: ['./cour.component.css']
})
export class CourComponent {
  public addDialogOpened = false;
  public editDialogOpened = false;
  public animation: boolean | DialogAnimation = {};
  public dialogThemeColor: any = "primary";
  public icons = { trash: plusIcon };
  public user:Users | null=null;
  gridData:any[] =[];
  public fillMode: ButtonFillMode = "flat";
  constructor(private fb: FormBuilder,private courService:CourService,private dialogService: DialogService ,private accountService:AccountService) { this.user=this.accountService.userValue }
  

  ngOnInit(): void {
   this.getGridData();

  }
  getGridData(){
    if(this.user?.role=='admin' ||this.user?.role=='participant' ){
      this.courService.GetCourList().subscribe(data=>this.gridData=data)
        }
        else if(this.user?.role=='formateur'){
          this.courService.GetCourByForId(this.user.id).subscribe(data=> this.gridData=data)
            }
    
          }

edit(item:any){}
  public delete(id: string): void {
  this.courService.delete(id).subscribe(data=>{this.getGridData()})
  }
 
  saveByteArray(item:any) {
    var src= "data:application/"+item.documentType+";base64," +item.documentContent;
    saveAs(src, item.documentName+'.'+item.documentType);
}

  openCourDetails(dataItem:Cour |null){
    const dialog: DialogRef = this.dialogService.open({
      title: dataItem==null?"Ajouter un Cours":"Editer le Cours",
      content: CourdetailsComponent ,
      width: "50%",
    });
    const courInfo=dialog.content.instance;
    courInfo.cour=dataItem
    courInfo.id=this.user?.id
    dialog.result.subscribe((result) => {
      if (!(result instanceof DialogCloseResult)) {
        if(courInfo.courForm.valid){
          //let cour=new Cour();
         var  cour=courInfo.courForm.value;
          if(dataItem==null){
          this.courService.ajouterCour(cour.titre,cour.formation.id,cour.contenu).subscribe(data=>{this.getGridData();Swal.fire('Valide', "Ajout effectué avec succés", 'success');})
      } 
      else{
        cour.id=dataItem.id;
       this.courService.editCour(cour).subscribe(data=>{this.getGridData();Swal.fire('Valide', "Modification effectué avec succés", 'success');})
       

      }
  } 
   
}

});
}

}
