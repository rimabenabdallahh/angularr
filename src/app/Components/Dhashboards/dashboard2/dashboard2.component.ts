import { Component ,Input ,OnInit } from '@angular/core';
import { SideNavToggle } from '../side-nav/sidebarToggle';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component implements OnInit{
  isSideNavCollapsed = false ;
  screenWidth = 0;
  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    this.getBodyClass();
  }
  getBodyClass():String{
    
    let styleClass='';
    if(this. isSideNavCollapsed && this.screenWidth > 768){
      styleClass = 'body-trimmed';
    }else if (this. isSideNavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = 'body-md-screen'
    }
    return styleClass ;
  }
  ngOnInit(): void {
    this.getBodyClass();
  }
}
