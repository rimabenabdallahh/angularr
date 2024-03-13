import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  protected prepareHeader(): Object {
    
     let headers = new HttpHeaders();
      headers = headers.set('Accept', 'application/json');
      return { headers: headers }; }

  getList(url:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${url}`,this.prepareHeader()).pipe(map(res => res as any)); 
  }
  getById(url:any,id:any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${url}`+ '/' + id,this.prepareHeader()).pipe(map(res => res as any)); 
  }
  delete(url:any,id:any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${url}` + '/' + id, this.prepareHeader()).pipe(map(res => res as any));
   }
   add(url:any ,data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${url}` ,data, this.prepareHeader()).pipe(map(res => res as any));
   }
   update(url:any ,data:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${url}` ,data, this.prepareHeader()).pipe(map(res => res as any));
   }

}
