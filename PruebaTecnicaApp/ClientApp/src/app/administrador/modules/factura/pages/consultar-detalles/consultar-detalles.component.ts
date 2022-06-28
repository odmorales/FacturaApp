import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DetalleFactura } from '../../classes/detalleFactura';
import { FacturaService } from '../../services/factura.service';

import { switchMap } from 'rxjs';

@Component({
  selector: 'app-consultar-detalles',
  templateUrl: './consultar-detalles.component.html',
  styles: [
  ]
})
export class ConsultarDetallesComponent implements OnInit {

  detalles: DetalleFactura[] = [];

  constructor(private facturaService: FacturaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.facturaService.getId(id))
      )
      .subscribe(factura => {
        this.detalles = factura.detalles;
    });
  }

  registrar(){
    this.router.navigate(['user/factura/consultar-factura']);
  }

}
