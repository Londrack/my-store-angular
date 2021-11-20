import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../interfaces/auth.model';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(email:string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password});
  }

  profile(token: string){
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      headers:{
        Authorization: `Bearer ${token}`,
        // 'Content-type': 'application/json'
      }
    });
  }
}
