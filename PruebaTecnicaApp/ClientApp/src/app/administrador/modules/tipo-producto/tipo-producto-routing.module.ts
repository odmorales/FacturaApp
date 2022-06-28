import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarTipoComponent } from './pages/consultar-tipo/consultar-tipo.component';
import { RegistrarTipoComponent } from './pages/registrar-tipo/registrar-tipo.component';

const routes: Routes = [
  {
    path: 'consultar-tipo',
    component: ConsultarTipoComponent
  },
  {
    path: 'registrar-tipo',
    component: RegistrarTipoComponent
  },
  {
    path: 'editar-tipo/:id',
    component: RegistrarTipoComponent
  },
  {
    path: '**',
    redirectTo: 'consultar-tipo'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoProductoRoutingModule { }
