import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarClienteComponent } from './pages/consultar-cliente/consultar-cliente.component';
import { ClienteComponent } from './pages/registrar-cliente/cliente.component';

const routes: Routes = [
  {
    path: "consultar-cliente",
    component: ConsultarClienteComponent
  },
  {
    path: "registrar-cliente",
    component: ClienteComponent
  },
  {
    path: "editar-cliente/:id",
    component: ClienteComponent
  },
  {
    path: '**',
    redirectTo: 'consultar-cliente'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
