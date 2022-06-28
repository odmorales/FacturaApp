import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarProductoComponent } from './pages/consultar-producto/consultar-producto.component';
import { RegistrarProductoComponent } from './pages/registrar-producto/registrar-producto.component';

const routes: Routes = [
  {
    path: 'consultar-producto',
    component: ConsultarProductoComponent
  },
  {
    path: 'registrar-producto',
    component: RegistrarProductoComponent
  },
  {
    path: 'editar-producto/:id',
    component: RegistrarProductoComponent
  },
  {
    path: '**',
    redirectTo: 'consultar-producto'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
