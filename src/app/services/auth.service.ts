import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../interfaces/auth.model';
import { User } from '../interfaces/user.model';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient,
    private ts: TokenService
  ) { }

  login(email:string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.ts.save(response.access_token) )
    );
  }

  profile(){
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }
}
