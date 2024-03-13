import { DialogCloseResult, DialogRef, DialogService} from '@progress/kendo-angular-dialog';
import { Component} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { DialogAnimation } from '@progress/kendo-angular-dialog';
import { plusIcon } from '@progress/kendo-svg-icons';
import { FormationService } from 'src/app/services/formation.services';
import { Users } from 'src/app/models/user.model';
import { DetailFormationComponent } from './detail-formation/detail-formation.component';
import { Formation } from 'src/app/models/formation.model';
import { AccountService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dossier-list',
  templateUrl: './dossier-list.component.html',
  styleUrls: ['./dossier-list.component.css']
})
export class DossierListComponent {
 
  public addDialogOpened = false;
  public editDialogOpened = false;
  public animation: boolean | DialogAnimation = {};
  public dialogThemeColor: any = "primary";
  public icons = { trash: plusIcon };
  public user:Users | null=null;
  gridData:Formation[] =[];
  constructor(private fb: FormBuilder,private formationService:FormationService,private dialogService: DialogService,
    private accountService:AccountService) { this.user=this.accountService.userValue }

  ngOnInit(): void {
   this.getGridData();

  }
  getGridData(){
         if(this.user?.role!= "formateur"){
          this.formationService.GetFormationList().subscribe(data=>this.gridData=data)
         }
         if(this.user?.role=="formateur"){
          this.formationService.GetFormationByFormateurId(this.user?.id).subscribe(data=>this.gridData=data)
         }
      
     // this.formationService.GetFormationById().subscribe(data=>this.gridData=data)

  

    
  }
  onSubmit() {
  }




  public deleteFormation(id: string): void {
  this.formationService.delete(id).subscribe(data=>{this.getGridData()})
  }
 
  

  openFormationDetails(dataItem:Formation |null){
    const dialog: DialogRef = this.dialogService.open({
      title: dataItem==null?"Ajouter une Formation":"Editer la Formation",
      content: DetailFormationComponent ,
      width: "50%",
      height:"90%"
    });
    const formationInfo=dialog.content.instance;
    formationInfo.formation=dataItem
    dialog.result.subscribe((result) => {
      if (!(result instanceof DialogCloseResult)) {
        if(formationInfo.formationForm.valid){
          let formation=new Formation();
          formation=formationInfo.formationForm.value;
          if(dataItem==null){
          this.formationService.ajouterFormation(formation).subscribe(data=>{this.getGridData(); Swal.fire('Valide', "Ajout effectué avec succés", 'success');})
         
      } 
      else{
        formation.id=dataItem.id;
       this.formationService.editFormation(formation).subscribe(data=>{this.getGridData(), Swal.fire('Valide', "Modification effectué avec succés", 'success');})
      

      }
  } 
  
}

});
}
}

