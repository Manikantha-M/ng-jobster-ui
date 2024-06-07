import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public hideSpinner: boolean = true;
  // private apiUrl = '/api';
  private apiUrl = 'http://localhost:3000/api';
  public token:string = '';
  public userObj: User = {
    name: 'Test User',
    email: 'testuser@test.com',
    lastName: 'lastName',
    location: 'my city'
  };
  public editJobObj:any = {};

  // Since Angular app and Node.js server are on the same host, you can use a relative URL '/api'

  constructor(private http: HttpClient, private _snackbar:MatSnackBar) { 
    if(Object.values(sessionStorage.getItem('jobsterAPI') || {}).length){
      const userData: any =  JSON.parse(sessionStorage.getItem('jobsterAPI') || '{}');
      this.userObj = userData?.user;
      this.token = userData.token;
    }
  }


  // GET request
  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  // POST request
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  // PATCH request
  patch(endpoint: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${endpoint}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
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

export interface User {
  "email": string,
  "lastName": string,
  "location": string,
  "name": string
}

