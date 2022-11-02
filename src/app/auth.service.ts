import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _router: Router) { }
  baseUri: string = "http://localhost:3000/";
  
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loginUser(user: any) {
    return this.http.post<any>(this.baseUri+"login", user);
  };

  userSignUp(user: any) {
    return this.http.post<any>(this.baseUri+"signup", user);
  }

  createToken(id: any) {
    return this.http.post<any>(this.baseUri+"gettoken", {user_id: id})
  }

}
