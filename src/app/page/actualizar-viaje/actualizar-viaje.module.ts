import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarViajePageRoutingModule } from './actualizar-viaje-routing.module';

import { ActualizarViajePage } from './actualizar-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarViajePageRoutingModule
  ],
  declarations: [ActualizarViajePage]
})
export class ActualizarViajePageModule {}
