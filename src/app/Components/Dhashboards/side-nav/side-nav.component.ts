import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component ,EventEmitter,Output ,OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AdminNavbarData, ClientNavbarData, FormateurNavbarData,ParticipantNavbarData} from './nav-data'
import { SideNavToggle } from './sidebarToggle';
import { Users } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/login.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  animations :[
    trigger('fadeInOut',[
      transition(':enter',[
        style({opacity:0}),
        animate('350ms',
        style({opacity:1}))
      ]),
      transition(':leave',[
        style({opacity:1}),
        animate('350ms',
        style({opacity:0}))
      ])
    ]),
    trigger('rotate', [
      transition(':enter',[
        animate('1000ms',
        keyframes([
          style({transform : 'rotate(0deg)', offset: '0'}),
          style({transform : 'rotate(2turn)', offset: '1'})

        ]))
      ])
    ])
  ]
})
export class SideNavComponent implements OnInit{
@Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter(); 
 collapsed = false ; 
 //
  navData:any;
  //
 screenWidth =0;
 user:Users | null=null;
 constructor(private router :Router,private account:AccountService){
  this.user=this.account.userValue;
  console.log("ussser",this.user);
  
 }
 @HostListener('window:resize',['$event'])
 onResize(event:any){
  this.screenWidth = window.innerWidth;
  if(this.screenWidth <= 768){
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed : this.collapsed ,screenWidth :this.screenWidth})

  }
 }
 ngOnInit(): void {
     this.screenWidth = window.innerWidth;
     console.log(this.user);
     
     if(this.user?.role=="admin"){
          this.navData=AdminNavbarData
     }
     if(this.user?.role=="client"){
      this.navData=ClientNavbarData
 }
 if(this.user?.role=="formateur"){
  this.navData=FormateurNavbarData
}
if(this.user?.role=="participant"){ 
this.navData=ParticipantNavbarData
}
   }

 toggleCollapse():void{
   this.collapsed = !this.collapsed ;
   this.onToggleSideNav.emit({collapsed : this.collapsed ,screenWidth :this.screenWidth})}

 CloseSidenav():void{
   this.collapsed = false ;
   this.onToggleSideNav.emit({collapsed : this.collapsed ,screenWidth :this.screenWidth})}
   navigate(url:any){
     this.router.navigate(['${url}'])
     this.onToggleSideNav.emit({collapsed : this.collapsed ,screenWidth :this.screenWidth})}

   }
  
