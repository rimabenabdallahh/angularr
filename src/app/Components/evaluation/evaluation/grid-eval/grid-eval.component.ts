import { Component, OnInit } from '@angular/core';
import { ButtonFillMode } from '@progress/kendo-angular-buttons';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { EvalService } from 'src/app/services/eval.service';
import { TabEvalComponent } from '../tab-eval/tab-eval.component';

@Component({
  selector: 'app-grid-eval',
  templateUrl: './grid-eval.component.html',
  styleUrls: ['./grid-eval.component.css']
})
export class GridEvalComponent implements OnInit {
  gridData :any =[];
  public fillMode: ButtonFillMode = "flat";

  constructor(private evalService:EvalService,private dialogService: DialogService){
    
   }
  ngOnInit(): void {
    this.evalService.GetAllEval().subscribe(data=>this.gridData=data)
  }

  viewEval(data:any){
this.evalService.GetEvalById(data.id).subscribe(data=>{
  this.view(data)
})
  }
  view(data:any){
    const dialog: DialogRef = this.dialogService.open({
      title: 'Affichage de l evaluation du participant',
      content: TabEvalComponent,
      width: "60%",
      height:"80%"
    });
    const evalInfo=dialog.content.instance;
    evalInfo.data=data
    evalInfo.readOnly=true

  }
}
