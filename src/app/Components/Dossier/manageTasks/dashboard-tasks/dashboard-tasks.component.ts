import { Component, OnInit,Output, EventEmitter} from '@angular/core';
import { DialogAnimation} from '@progress/kendo-angular-dialog';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { plusIcon } from '@progress/kendo-svg-icons';


@Component({
  selector: 'app-dashboard-tasks',
  templateUrl: './dashboard-tasks.component.html',
  styleUrls: ['./dashboard-tasks.component.css']
})
export class DashboardTasksComponent implements OnInit{
  public opened = false;
  public animation: boolean | DialogAnimation = {};
  public dialogThemeColor:any= "primary";
  public icons = { trash:plusIcon };
  @Output() taskAdded: EventEmitter<any> = new EventEmitter();

  constructor( ){
   
  }
  
  ngOnInit(): void {
 
  }

  
  public onTabSelect(e: SelectEvent): void {
    console.log(e);
  }
 
}