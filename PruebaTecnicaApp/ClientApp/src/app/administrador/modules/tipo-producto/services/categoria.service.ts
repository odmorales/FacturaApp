import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoProducto } from '../class/tipo';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<TipoProducto[]>(`${ this.baseUrl }/TipoProducto`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }  

  getId(id: number) {
    return this.http.get<TipoProducto>(`${ this.baseUrl }/TipoProducto/${ id }`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  post(tipo: TipoProducto) {
    return this.http.post<TipoProducto>(`${ this.baseUrl }/TipoProducto`, tipo)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  put(tipo: TipoProducto) {
    return this.http.put<TipoProducto>(`${ this.baseUrl }/TipoProducto/${tipo.id}`, tipo)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  delete(id: number) {
    return this.http.delete<string>(`${ this.baseUrl }/TipoProducto/${ id }`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }
}
