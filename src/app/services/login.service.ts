import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from 'src/app/models/user.model';
import { environment } from 'src/environment';


@Injectable({ providedIn: 'root' })
export class AccountService {
     userSubject: BehaviorSubject<Users | null>;
    public user: Observable<Users | null>;
    url=environment.apiUrl;
    constructor(
        private router: Router,
        private _http: HttpClient

    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }
    login(username:string,pwd:string) {
        return this._http.get<Users>(`${environment.apiUrl}/api/users/${username}/${pwd}`,this.prepareHeader()).pipe(
            map(res => res as Users)
        );
    }

    // login(username:string,pwd:string): Observable<Users> { 
    //     return this._http.get(this.url+'/users/'+username+'/'+pwd, this.prepareHeader()).pipe(map(res => res as Users));
    // }

    // login(username: string, password: string) {
    //     return this.http.post(`${environment.apiUrl}/users`, { username, password })
    //         .pipe(map(user => {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('user', JSON.stringify(user));
    //             this.userSubject.next(user);
    //             return user;
    //         }));
    // }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }
    
    protected prepareHeader(): Object {
        let headers = new HttpHeaders();
       // headers.set('Access-Control-Allow-Origin', '*')
        headers = headers.set('Accept', 'application/json');
       // headers=headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        return { headers: headers };
    }

   

    // getAll() {
    //     return this.http.get<Users[]>(`${environment.apiUrl}/users`);
    // }

    // getById(id: string) {
    //     return this.http.get<Users>(`${environment.apiUrl}/users/${id}`);
    // }

    // update(id: string, params: any) {
    //     return this.http.put(`${environment.apiUrl}/users/${id}`, params)
    //         .pipe(map(x => {
    //             // update stored user if the logged in user updated their own record
    //             if (id == this.userValue?.id) {
    //                 // update local storage
    //                 const user = { ...this.userValue, ...params };
    //                 localStorage.setItem('user', JSON.stringify(user));

    //                 // publish updated user to subscribers
    //                 this.userSubject.next(user);
    //             }
    //             return x;
    //         }));
    // }

    // delete(id: string) {
    //     return this.http.delete(`${environment.apiUrl}/users/${id}`)
    //         .pipe(map(x => {
    //             // auto logout if the logged in user deleted their own record
    //             if (id == this.userValue?.id) {
    //                 this.logout();
    //             }
    //             return x;
    //         }));
    // }
}