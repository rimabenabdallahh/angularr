import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Email, } from '../models/email.model';
import { environment } from 'src/environment';


@Injectable({ providedIn: 'root' })
export class EmailService {
    url = environment.apiUrl;
    constructor(
        private router: Router,
        private _http: HttpClient

    ) {
    }

    GetEmailsList(role:any) {
        return this._http.get<any[]>(`${environment.apiUrl}/Email/List/${role}`, this.prepareHeader()).pipe(
            map(res => res as any[])
        );
    }
    GetAllEmails() {
        return this._http.get<Email[]>(`${environment.apiUrl}/Emails`, this.prepareHeader()).pipe(
            map(res => res as Email[])
        );
    }
    ajouterEmail(email: Email) {
        return this._http.post<any>(`${environment.apiUrl}/api/Email`, email, this.prepareHeader()).pipe(
            map(res => res as any)
        );
    }

    
    protected prepareHeader(): Object {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        return { headers: headers };
    }
}
