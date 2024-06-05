import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private apiUrl = '/api';
  private apiUrl = 'http://localhost:3000/api';
  public token:string = '';
  public userObj: any = {name:'Test User'};

  // Since Angular app and Node.js server are on the same host, you can use a relative URL '/api'

  constructor(private http: HttpClient, private _snackbar:MatSnackBar) { }


  // GET request
  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  // POST request
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // PATCH request
  patch(endpoint: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${endpoint}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // DELETE request
  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`);
  }
  
  showSnackbar(message: string){
    this._snackbar.open(message,'ok',{duration:3000});
  }
}
