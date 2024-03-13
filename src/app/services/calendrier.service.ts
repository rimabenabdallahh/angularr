import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ItemModel } from '../models/cour.model';
import { environment } from 'src/environment';


@Injectable({ providedIn: 'root' })
export class CalendrierService {
    url = environment.apiUrl;
    constructor(
        private router: Router,
        private _http: HttpClient

    ) {
    }

    GetAppointmentsList() {
        return this._http.get<any[]>(`${environment.apiUrl}/Sessions/List`, this.prepareHeader()).pipe(
            map(res => res as any[])
        );
    }
    
    GetAllFormations() {
        return this._http.get<ItemModel[]>(`${environment.apiUrl}/Formations/Li`,this.prepareHeader()).pipe(
            map(res => res as ItemModel[])
        );
    }



    protected prepareHeader(): Object {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        return { headers: headers };
    }
}
