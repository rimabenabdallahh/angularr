import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { DialogAnimation} from '@progress/kendo-angular-dialog';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { plusIcon } from '@progress/kendo-svg-icons';
import { Users } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/login.service';
;


@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit{
  public opened = false;
  public animation: boolean | DialogAnimation = {};
  public dialogThemeColor:any= "primary";
  public icons = { trash:plusIcon };
  user:Users | null=null;
  @Output() taskAdded: EventEmitter<any> = new EventEmitter();

  constructor(private account:AccountService ){
    this.user=this.account.userValue;
  }
  
  ngOnInit(): void {
 
  }

  
  public onTabSelect(e: SelectEvent): void {
    console.log(e);
  }
 
}

