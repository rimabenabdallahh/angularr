import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Formation, ItemModel } from 'src/app/models/formation.model';
import { environment } from 'src/environment';


@Injectable({ providedIn: 'root' })
export class FormationService {
    url = environment.apiUrl;
    constructor(
        private router: Router,
        private _http: HttpClient

    ) {
    }


    GetFormationList() {
        return this._http.get<Formation[]>(`${environment.apiUrl}/Formations/List`, this.prepareHeader()).pipe(
            map(res => res as Formation[])
        );
    }
    GetFormationByFormateurId(id:any) {
        return this._http.get<Formation[]>(`${environment.apiUrl}/Formation/Formateur/${id}`, this.prepareHeader()).pipe(
            map(res => res as Formation[])
        );
    }

    GetAllFormateur() {
        return this._http.get<ItemModel[]>(`${environment.apiUrl}/api/Formateur`,this.prepareHeader()).pipe(
            map(res => res as ItemModel[])
        );
    }

    IncrementParticipantNumber(lien:any){
        return this._http.put<any>(`${environment.apiUrl}/Formation/nb`,lien, this.prepareHeader()).pipe(
            map(res => res as any)
        );
    }



    ajouterFormation(formation: Formation) {
        return this._http.post<any>(`${environment.apiUrl}/api/Formation`, formation, this.prepareHeader()).pipe(
            map(res => res as any)
        );
    }
    editFormation(formation: Formation) {
        return this._http.put<any>(`${environment.apiUrl}/api/Formation`, formation, this.prepareHeader()).pipe(
            map(res => res as any)
        );
    }



    delete(id: string) {
        return this._http.delete(`${environment.apiUrl}/api/Formation/${id}`)
            .pipe(map(res => res as any))
    }
    
    protected prepareHeader(): Object {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        return { headers: headers };
    }
}
