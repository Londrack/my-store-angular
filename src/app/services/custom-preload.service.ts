import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy{

  constructor() { }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if(route.data && route.data['preloade']){
      return load();
    }
    return of(null)
  }
}
