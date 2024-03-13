import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Cour,ItemModel } from '../models/cour.model';
import { environment } from 'src/environment';


@Injectable({ providedIn: 'root' })
export class CourService {
    url = environment.apiUrl;
    constructor(
        private router: Router,
        private _http: HttpClient

    ) {
    }

    GetCourList() {
        return this._http.get<any[]>(`${environment.apiUrl}/Cours/List`, this.prepareHeader()).pipe(
            map(res => res as any[])
        );
    }
    GetCourByForId(id:any) {
        return this._http.get<Cour[]>(`${environment.apiUrl}/Cours/formateur/${id}`, this.prepareHeader()).pipe(
            map(res => res as Cour[])
        );
    }

    GetAllFormations(id:string) {
        return this._http.get<ItemModel[]>(`${environment.apiUrl}/Formations/Li/${id}`,this.prepareHeader()).pipe(
            map(res => res as ItemModel[])
        );
    }



    ajouterCour(title:any,formationid:any,file:any) {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this._http.post<any>(`${environment.apiUrl}/api/Cours?titre=${title}&formId=${formationid}`,formData, { reportProgress: true,
            responseType: 'json'}).pipe(
            map(res => res as any)
        );
    }



    editCour(cour: Cour) {
        return this._http.put<any>(`${environment.apiUrl}/api/Cours`, cour, this.prepareHeader()).pipe(
            map(res => res as any)
        );
    }



    delete(id: string) {
        return this._http.delete(`${environment.apiUrl}/api/Cours/${id}`)
            .pipe(map(res => res as any))
    }
    
    protected prepareHeader(): Object {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        return { headers: headers };
    }
}
