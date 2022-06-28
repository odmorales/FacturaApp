import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from '../../classes/factura';
import { FacturaService } from '../../services/factura.service';

import { switchMap } from 'rxjs';

@Component({
  selector: 'app-consultar-factura',
  templateUrl: './consultar-factura.component.html',
  styles: [
  ]
})
export class ConsultarFacturaComponent implements OnInit {

  facturas: Factura[] = [];
  factura?: Factura;

  constructor(private facturaService: FacturaService,
              private router: Router) { }

  ngOnInit(): void {
    this.facturaService.get().subscribe(facturas => {
      this.facturas = facturas;
    });
  }

  registrar(){
    this.router.navigate(['user/factura/registrar-factura']);
  }

  eliminar(factura: Factura){
    console.log(factura);
    this.facturaService.delete(factura.id)
      .pipe(
        switchMap( (_) => this.facturaService.get() )
      )
      .subscribe( resp => this.facturas = resp );
  }

}
