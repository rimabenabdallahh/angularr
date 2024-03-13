import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environment';
import { Facture,ItemModel} from '../models/facture.model';



@Injectable({ providedIn: 'root' })
export class FactureService {
    url = environment.apiUrl;
    constructor(
        private router: Router,
        private _http: HttpClient,

    ) {
    }

    GetFactureList() {
        return this._http.get<any[]>(`${environment.apiUrl}/Facture/List`, this.prepareHeader()).pipe(
            map(res => res as any[])
        );
    }
    GetFactureByClientId(id:any) {
        return this._http.get<Facture[]>(`${environment.apiUrl}/Facture/Client/${id}`, this.prepareHeader()).pipe(
            map(res => res as Facture[])
        );
    }

    GetAllClient() {
        return this._http.get<ItemModel[]>(`${environment.apiUrl}/api/Client`,this.prepareHeader()).pipe(
            map(res => res as ItemModel[])
        );
    }



    ajouterFacture(clientid:any,file:any) {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this._http.post<any>(`${environment.apiUrl}/api/Facture?formId=${clientid}`,formData, { reportProgress: true,
            responseType: 'json'}).pipe(
            map(res => res as any)
        );
    }



    editFacture(facture: Facture) {
        return this._http.put<any>(`${environment.apiUrl}/api/Facture`, facture, this.prepareHeader()).pipe(
            map(res => res as any)
        );
    }



    delete(id: string) {
        return this._http.delete(`${environment.apiUrl}/api/Facture/${id}`)
            .pipe(map(res => res as any))
    }
    
    protected prepareHeader(): Object {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        return { headers: headers };
    }

}
