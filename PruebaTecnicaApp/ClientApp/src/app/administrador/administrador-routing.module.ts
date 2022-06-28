import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TipoProductoModule } from './modules/tipo-producto/tipo-producto.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'cliente',
        loadChildren: () => import('../administrador/modules/cliente/cliente.module').then(m => m.ClienteModule)
      },
      {
        path: 'categoria',
        loadChildren: () => import('../administrador/modules/tipo-producto/tipo-producto.module').then(m => m.TipoProductoModule)
      },
      {
        path: 'producto',
        loadChildren: () => import('../administrador/modules/producto/producto.module').then(m => m.ProductoModule)
      },
      {
        path: 'factura',
        loadChildren: () => import('../administrador/modules/factura/factura.module').then(m => m.FacturaModule)
      },
      {
        path: '**',
        redirectTo: 'cliente'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
