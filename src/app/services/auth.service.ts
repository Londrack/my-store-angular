import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../interfaces/auth.model';
import { User } from '../interfaces/user.model';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private ts: TokenService
  ) { }

  login(email:string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => { this.ts.save(response.access_token) })
    );
  }

  profile(){
    return this.http.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      tap(user =>{
        this.user.next(user)
        // localStorage.setItem('profile', JSON.stringify(user));
      })
    );
  }

  logout(){
    this.ts.remove();
    localStorage.removeItem('profile');
  }
}
