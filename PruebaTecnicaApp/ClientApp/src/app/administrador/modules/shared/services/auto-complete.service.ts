import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  miFormulario?: FormGroup;
  filteredOptions?: Observable<any[]>;
  dato: any;

  constructor() { }

  recibirForm(formulario: FormGroup) {
    this.miFormulario = formulario;
  }

  autoComplete(lista: any[], campo: string) {

    return this.filteredOptions = this.miFormulario?.get(campo)?.valueChanges.pipe(
      startWith(''),
      map(name => (name ? this._filter(lista, name).slice(0, 5) : lista.slice(0, 5))),
    );
  }

  opcionSeleccionada(dato: any, tipo: string) {

    if( dato == undefined ) {
      return;
    }

    var formulario = this.miFormulario?.get(tipo);

    switch (tipo) {
      case 'idTipoProducto':
        formulario?.reset(dato.nombre);
        break;

      case 'idCliente':
        formulario?.reset(dato.nombre);
        break;
    }
  }

  private _filter(lista: any[], name: string): any[] {
    const filterValue = name.toString().toLowerCase();
      return lista.filter(opcion => opcion.nombre?.toLowerCase().includes(filterValue));
  }
}
