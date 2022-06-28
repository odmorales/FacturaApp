import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../class/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Cliente[]>(`${ this.baseUrl }/Cliente`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }  

  getId(id: number) {
    return this.http.get<Cliente>(`${ this.baseUrl }/Cliente/${ id }`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  post(cliente: Cliente) {
    return this.http.post<Cliente>(`${ this.baseUrl }/Cliente`, cliente)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  put(cliente: Cliente) {
    return this.http.put<Cliente>(`${ this.baseUrl }/Cliente/${cliente.id}`, cliente)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }

  delete(id: number) {
    return this.http.delete<string>(`${ this.baseUrl }/Cliente/${ id }`)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError(error => of(error))
      );
  }
}
