import { Component, OnInit } from '@angular/core';
import { DetalleFactura } from '../../classes/detalleFactura';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-factura',
  templateUrl: './editar-factura.component.html',
  styles: [
  ]
})
export class EditarFacturaComponent implements OnInit {

  detalleFactura?: DetalleFactura

  miFormulario: FormGroup = this.fb.group({
    idProducto: [''],
    idFactura: [''],
    cantidad: ['', Validators.required],
    valor: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

}
