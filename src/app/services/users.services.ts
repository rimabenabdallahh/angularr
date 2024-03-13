import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Users } from 'src/app/models/user.model';
import { environment } from 'src/environment';


@Injectable({ providedIn: 'root' })
export class UsersService {
    url=environment.apiUrl;
    constructor(
        private router: Router,
        private _http: HttpClient

    ) {
    }

    GetAdminList(){
        return this._http.get<Users[]>(`${environment.apiUrl}/Admins/List`,this.prepareHeader()).pipe(
            map(res => res as Users[])
        );
    }
    GetFormateursList() {
        return this._http.get<Users[]>(`${environment.apiUrl}/Formateurs/List`,this.prepareHeader()).pipe(
            map(res => res as Users[])
        );
    }
    GetClientsList() {
        return this._http.get<Users[]>(`${environment.apiUrl}/Clients/List`,this.prepareHeader()).pipe(
            map(res => res as Users[])
        );
    }
    GetParticipantsList() {
        return this._http.get<Users[]>(`${environment.apiUrl}/Participants/List`,this.prepareHeader()).pipe(
            map(res => res as Users[])
        );
    }
    GetAllClients() {
        return this._http.get<any[]>(`${environment.apiUrl}/api/Client`,this.prepareHeader()).pipe(
            map(res => res as any[])
        );
    }
    GetUserByIdRole(id:any,role:any) {
        return this._http.get<any>(`${environment.apiUrl}/User/Role/${role}/${id}`,this.prepareHeader()).pipe(
            map(res => res as any)
        );
    }
  
    ajouterUser(user:Users){
        return this._http.post<any>(`${environment.apiUrl}/api/Users`,user,this.prepareHeader()).pipe(
            map(res => res as any)
        );
    }
    editerrUser(user:Users){
        return this._http.put<any>(`${environment.apiUrl}/api/Users`,user,this.prepareHeader()).pipe(
            map(res => res as any)
        );
    }
    GetParticipantByClientId(id:any) {
        return this._http.get<any>(`${environment.apiUrl}/Participant/client/${id}`, this.prepareHeader()).pipe(
            map(res => res as any)
        );
    }



    delete(id: string) {
        return this._http.delete(`${environment.apiUrl}/api/Users/${id}`)
            .pipe(map(res => res as any))
            }
            protected prepareHeader(): Object {
                let headers = new HttpHeaders();
                headers = headers.set('Accept', 'application/json');
                return { headers: headers };
            }
    }

  


