import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarFacturaComponent } from './pages/consultar-factura/consultar-factura.component';
import { EditarFacturaComponent } from './pages/editar-factura/editar-factura.component';
import { RegistroFacturaComponent } from './pages/registro-factura/registro-factura.component';
import { ConsultarDetallesComponent } from './pages/consultar-detalles/consultar-detalles.component';

const routes: Routes = [
  {
    path: 'consultar-factura',
    component: ConsultarFacturaComponent
  },
  {
    path: 'registrar-factura',
    component: RegistroFacturaComponent
  },
  {
    path: 'editar-factura/:id',
    component: EditarFacturaComponent
  },
  {
    path: 'consultar-detalles/:id',
    component: ConsultarDetallesComponent
  },
  {
    path: '**',
    redirectTo: 'consultar-factura'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
