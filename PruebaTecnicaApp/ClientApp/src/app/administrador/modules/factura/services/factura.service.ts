import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Factura } from '../classes/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Factura[]>(`${ this.baseUrl }/Factura`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }  

  getId(id: number) {
    return this.http.get<Factura>(`${ this.baseUrl }/Factura/${ id }`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  post(factura: Factura) {
    return this.http.post<Factura>(`${ this.baseUrl }/Factura`, factura)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  put(factura: Factura) {
    return this.http.put<Factura>(`${ this.baseUrl }/Factura/${factura.id}`, factura)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  delete(id: number) {
    return this.http.delete<string>(`${ this.baseUrl }/Factura/${ id }`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }
}
