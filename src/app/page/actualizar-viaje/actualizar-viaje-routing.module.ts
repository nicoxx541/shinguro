import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarViajePage } from './actualizar-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarViajePageRoutingModule {}
