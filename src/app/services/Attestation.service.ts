import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ItemModel } from '../models/cour.model';
import { environment } from 'src/environment';
import { Attestation } from '../models/attestation.model';


@Injectable({ providedIn: 'root' })
export class AttestationService {
    url = environment.apiUrl;
    constructor(
        private router: Router,
        private _http: HttpClient

    ) {
    }

    GetAttestationsList() {
        return this._http.get<any[]>(`${environment.apiUrl}/Attestations/List`, this.prepareHeader()).pipe(
            map(res => res as any[])
        );
    }
    GetAttestationsByParticipant(id:any) {
        return this._http.get<any[]>(`${environment.apiUrl}/Attestation/Par/${id}`, this.prepareHeader()).pipe(
            map(res => res as any[])
        );
    }
   

    GetParticipants() {
        return this._http.get<ItemModel[]>(`${environment.apiUrl}/Attestations/Participant`,this.prepareHeader()).pipe(
            map(res => res as ItemModel[])
        );
    }



    ajouterAttestation(participantid:any,file:any) {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this._http.post<any>(`${environment.apiUrl}/api/Attestation?partId=${participantid}`,formData, { reportProgress: true,
            responseType: 'json'}).pipe(
            map(res => res as any)
        );
    }



    editAttestation(attestation: Attestation) {
        return this._http.put<any>(`${environment.apiUrl}/api/Attestation`, attestation, this.prepareHeader()).pipe(
            map(res => res as any)
        );
    }



    delete(id: string) {
        return this._http.delete(`${environment.apiUrl}/api/Attestation/${id}`)
            .pipe(map(res => res as any))
    }
    
    protected prepareHeader(): Object {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json');
        return { headers: headers };
    }
}
