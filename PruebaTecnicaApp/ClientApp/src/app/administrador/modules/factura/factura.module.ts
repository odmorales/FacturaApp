import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { RegistroFacturaComponent } from './pages/registro-factura/registro-factura.component';
import { ConsultarFacturaComponent } from './pages/consultar-factura/consultar-factura.component';
import { EditarFacturaComponent } from './pages/editar-factura/editar-factura.component';
import { ConsultarDetallesComponent } from './pages/consultar-detalles/consultar-detalles.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../design/material.module';
import { PrimeNgModule } from '../../../design/prime-ng.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RegistroFacturaComponent,
    ConsultarFacturaComponent,
    EditarFacturaComponent,
    ConsultarDetallesComponent
  ],
  imports: [
    CommonModule,
    FacturaRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimeNgModule,
    FlexLayoutModule, SharedModule
  ]
})
export class FacturaModule { }
