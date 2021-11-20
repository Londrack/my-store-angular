import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,  HttpStatusCode } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { CreateProductDTO, Product, UpdateProductDTO } from '../interfaces/product.model';
import { checkTime } from '../interceptors/time.interceptor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(limit?: number, offset?: number){
    return this.http.get<Product[]>(this.apiUrl)
  }

  getOne(id: string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
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
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  getByPage(limit: number, offset: number){
    return this.http.get<Product[]>(this.apiUrl, { params: {limit, offset}, context: checkTime() })
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
}
