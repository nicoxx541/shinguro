import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListaVehiculosPage } from './lista-vehiculos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaVehiculosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaVehiculosPage]
})
export class ListaVehiculosPageModule {}
