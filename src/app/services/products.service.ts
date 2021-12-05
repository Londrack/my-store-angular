import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,  HttpParams,  HttpStatusCode } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { CreateProductDTO, Product, UpdateProductDTO } from '../interfaces/product.model';
import { checkTime } from '../interceptors/time.interceptor';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getAll(limit?: number, offset?: number){
    return this.http.get<Product[]>(`${this.apiUrl}/products`)
  }

  getOne(id: string){
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict){
          return throwError('Algo falla en el server')
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe')
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError('No tienes permiso para ingresar')
        }
        return throwError('Ups algo salió mal')
      })
    )
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }

  getByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params: {limit, offset}, context: checkTime() })
    .pipe(
      retry(3),
      map(products =>
        products.map(item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
        })
      )
    )
  }

  getByCategory(categoryId: string, limit?:number, offset?: number){
    let params = new HttpParams();
    if(limit && offset != null){
      params = params.set('limit', limit);
      params = params.set('offset', offset)
    }
    return this.http
    .get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params })
    .pipe(
      catchError(err => this.handleError(err))
    )
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

      this.router.navigate(['/category-error']);
    }
    return throwError('Something bad happened; please try again later.');
  }

}
