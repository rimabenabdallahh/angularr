import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  fieldTextType!: boolean;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          username: ['', Validators.required,Validators.email],
          password: ['', Validators.required]
      });
  }

  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.accountService.login(this.f['username'].value, this.f['password'].value).subscribe(data =>{
          if(data){
              localStorage.setItem('user', JSON.stringify(data));
               this.accountService.userSubject.next(data);
               const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Home';
              this.router.navigateByUrl(returnUrl);
          }
          else{
              alert("Données erronées !");
              this.loading = false;
          }

      })
    
     
  }
  


toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

}
