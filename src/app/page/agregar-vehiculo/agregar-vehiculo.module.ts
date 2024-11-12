import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgregarvehiculoPageRoutingModule } from './agregar-vehiculo-routing.module';
import { AgregarVehiculoPage } from './agregar-vehiculo.page';  

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarvehiculoPageRoutingModule
  ],
  declarations: [AgregarVehiculoPage]  
})
export class AgregarVehiculoPageModule {}  
