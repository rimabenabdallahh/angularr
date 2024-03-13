import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  
  goTofb(){
    window.location.href = "https://www.facebook.com/stir.com.tn";
  }

}
