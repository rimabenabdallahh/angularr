import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Eval  } from 'src/app/models/eval.model';
import { environment } from 'src/environment';




@Injectable({ providedIn: 'root' })
export class EvalService {
    url = environment.apiUrl;
    constructor(
        private router: Router,
        private _http: HttpClient

    ) {
    }
    GetExistingEval(id:any) {
        return this._http.get<any>(`${environment.apiUrl}/api/Eval/checkEval/${id}`, this.prepareHeader()).pipe(
            map(res => res as any)
        );
    }
 
    GetAllEval() {
        return this._http.get<any[]>(`${environment.apiUrl}/api/Eval`, this.prepareHeader()).pipe(
            map(res => res as any[])
        );
    }
   
    GetEvalById(id:any) {
        return this._http.get<any>(`${environment.apiUrl}/Eval/Participant/${id}`, this.prepareHeader()).pipe(
            map(res => res as any)
        );
    }



    ajouterEval( evaluation: any) {
        return this._http.post<any>(`${environment.apiUrl}/api/Eval`, evaluation, this.prepareHeader()).pipe(
            map(res => res as any)
        );
    }
   
    
    protected prepareHeader(): Object {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        return { headers: headers };
    }
}
