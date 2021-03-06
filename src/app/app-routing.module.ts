import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './paginas/componentes/error404/error404.component';
import { LayoutComponent } from './paginas/componentes/layout/layout.component';
import { InicioSesionComponent } from './paginas/componentes/inicio-sesion/inicio-sesion.component';
import { GuardService } from './_servicio/gard-service.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/iniciar-sesion',
        pathMatch: 'full'
      },
      {
        path: 'dispositivo',
        loadChildren: () => import('./paginas/dispositivo/dispositivo.module').then(d => d.DispositivoModule)
      },
      {
        path: 'configuracion',
        loadChildren: () => import('./paginas/configuracion/configuracion.module').then(c => c.ConfiguracionModule)
      },
      {
        path: 'bodega',
        loadChildren: () => import('./paginas/bodega/bodega.module').then(b => b.BodegaModule)
      },
    ]
  },
  {
    path: 'iniciar-sesion',
    component: InicioSesionComponent
  },
  {
    path: 'error-404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '/error-404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
