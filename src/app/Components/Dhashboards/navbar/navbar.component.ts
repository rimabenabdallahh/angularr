import {
  Component,
  ViewEncapsulation,
  ViewChild,
  NgZone,
  AfterViewInit,
  ElementRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { Users } from "src/app/models/user.model";
import { AccountService } from "src/app/services/login.service";
import { UsersService } from "src/app/services/users.services";
import Swal from "sweetalert2";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
  avatar:string="";
  user:Users | null=null;
  userInfo:any;

  @ViewChild("anchor", { static: false })
  public anchor: ElementRef<HTMLElement> | undefined;



  //public kendokaAvatar =
    //"https://www.telerik.com/kendo-angular-ui-develop/components/navigation/appbar/assets/kendoka-angular.png";

  public margin = { horizontal: -46, vertical: 7 };
  public show = false;

  public onToggle(): void {
    this.show = !this.show;
  }

  constructor(private zone: NgZone , private router :Router,private account:AccountService,private userService:UsersService) {
    this.user=this.account.userValue;
  }
  ngOnInit(): void {
   
    this.getData()
  }
  getData(){
    this.userService.GetUserByIdRole(this.user?.id,this.user?.role).subscribe(data=>
      {this.userInfo=data;
        if(this.user?.role=="admin")
        {this.avatar="A"}
        else
        {this.avatar=data.nom[0].toUpperCase()+data.prenom[0].toUpperCase()}
      })
  }

  public ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener("resize", () => {
        if (this.show) {
          this.zone.run(() => this.onToggle());
        }
      });
    });
  }
  logout(){
    // here
    Swal.fire('Deconnexion', "Vous etes déconnectés", 'success')
       this.router.navigate(['Login'])
  }
  navigateToProfile() {
    this.router.navigate(['/Profile']); // Replace '/target-component' with the actual path to your target component
  }
}
