import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/users';

  constructor(
    private http: HttpClient
  ) { }

}
