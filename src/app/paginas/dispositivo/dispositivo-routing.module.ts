import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioComponent } from './servicio/servicio.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'servicio',
    pathMatch: 'full'
  },
  {
    path: 'servicio',
    component: ServicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispositivoRoutingModule { }
