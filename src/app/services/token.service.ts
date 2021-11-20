import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  save(token: string){
    localStorage.setItem('token', token);
  }

  get(){
    return localStorage.getItem('token');
  }

}
