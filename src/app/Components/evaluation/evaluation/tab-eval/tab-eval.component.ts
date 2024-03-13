import { Component,OnInit,Input} from '@angular/core';
import { DialogCloseResult, DialogRef, DialogService, DialogThemeColor, } from '@progress/kendo-angular-dialog';
import { FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { EvalService } from 'src/app/services/eval.service';
import { plusIcon } from '@progress/kendo-svg-icons';
import { DialogAnimation } from '@progress/kendo-angular-dialog';
import { DialogContentBase } from '@progress/kendo-angular-dialog';
import { Eval } from 'src/app/models/eval.model';
import { Users } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/login.service';

;

@Component({
  selector: 'app-tab-eval',
  templateUrl: './tab-eval.component.html',
  styleUrls: ['./tab-eval.component.css']
})
export class TabEvalComponent implements OnInit{
  evalForm!: FormGroup;
  exist:boolean=false;

  public animation: boolean | DialogAnimation = {};
  public dialogThemeColor: any = "primary";
  @Input()data : Eval | null=null;
  @Input()readOnly=false;
  public icons = { trash: plusIcon };
  gridData:Eval[] =[];
  user:Users | null=null;
    constructor(private account:AccountService,private evalService:EvalService){
      this.user=this.account.userValue;      
     }
  
    ngOnInit(): void {
      this.checkExistEval()
      this.initForm(this.data);

    };
      
checkExistEval(){
  this.evalService.GetExistingEval(this.user?.id).subscribe(data=> this.exist=data)
}
  initForm( data:Eval|null){
    this.evalForm = new FormGroup({
      Nom: new FormControl(data?.Nom,[Validators.required]),
      Prenom: new FormControl(data?.Prenom,[Validators.required]),
      poste: new FormControl(data?.poste,[Validators.required]),
      CIN:new FormControl(data?.CIN,[Validators.required,Validators.minLength(8)]),
      Email:new FormControl(data?.Email,[Validators.required,Validators.email]),
     objClair: new FormControl(data?.objClair,[Validators.required]),
      objAtteint: new FormControl(data?.objAtteint,[Validators.required]),
      ContenuAd: new FormControl(data?.contenuAd,[Validators.required]),
      AppContenu: new FormControl(data?.appContenu,[Validators.required]),
      DureeSession:new FormControl(data?.dureeSession,[Validators.required]),
     HorairePrevu:new FormControl(data?.horairePrevu,[Validators.required]),
      Motiviation:new FormControl(data?.motiviation,[Validators.required]),
      THemeFor: new FormControl(data?.tHemeFor,[Validators.required]),
      Homogeneite: new FormControl(data?.homogeneite,[Validators.required]),
      Niveau: new FormControl(data?.niveau,[Validators.required]),
      AnimationGroupe: new FormControl(data?.animationGroupe,[Validators.required]),
      SupportPe: new FormControl(data?.supportPe,[Validators.required]),
      PresentationInf: new FormControl(data?.presentationInf,[Validators.required]),
      MaitriseLing : new FormControl(data?.maitriseLing,[Validators.required]),
      FormateurQues : new FormControl(data?.formateurQues,[Validators.required]),
     FormateurPresent : new FormControl(data?.formateurPresent,[Validators.required]),
      FormateurGestuel : new FormControl(data?.formateurGestuel,[Validators.required]),
      FormateurPsent : new FormControl(data?.formateurPsent,[Validators.required]),
      FormateurSerieux : new FormControl(data?.formateurSerieux,[Validators.required]),
     EntenduF: new FormControl(data?.entenduF,[Validators.required]),
     Etoile: new FormControl(data?.etoile,[Validators.required]),
    
    });
   

  }
  saveData() {
    this.evalForm.controls["Email"].setValue(this.user?.email)
    var evaal = new Eval();
    evaal=this.evalForm.value
    this.evalService.ajouterEval(evaal).subscribe(data=>{this.evalForm.reset();this.exist=true})
    // Example: Saving data to a server
  }
}
