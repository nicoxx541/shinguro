import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { PhotoComponent } from './component/photo/photo.component';

const redireccionarLogin = () => redirectUnauthorizedTo(['/Login']);
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'crear-usuario',
    loadChildren: () => import('./page/crear-usuario/crear-usuario.module').then( m => m.CrearUsuarioPageModule)
  },
  {
    path: 'principal',
    canActivate: [AngularFireAuthGuard], data:{authGuardPipe:redireccionarLogin},
    loadChildren: () => import('./page/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'recuperarpass',
    loadChildren: () => import('./page/recuperarpass/recuperarpass.module').then( m => m.RecuperarpassPageModule)
  },
  {
    path: 'photo',
    component: PhotoComponent
  },
  {
    path: 'agregar-vehiculo',
    loadChildren: () => import('./page/agregar-vehiculo/agregar-vehiculo.module').then( m => m.AgregarVehiculoPageModule)
  },
  {
    path: 'agregar-viaje',
    loadChildren: () => import('./page/agregar-viaje/agregar-viaje.module').then( m => m.AgregarViajePageModule)
  },
  {
    path: 'ver-viajes',
    loadChildren: () => import('./page/ver-viajes/ver-viajes.module').then( m => m.VerViajesPageModule)
  },
  {
    path: 'actualizar-viaje',
    loadChildren: () => import('./page/actualizar-viaje/actualizar-viaje.module').then( m => m.ActualizarViajePageModule)
  },
  {
    path: 'ver-vehiculos',
    loadChildren: () => import('./page/ver-vehiculos/ver-vehiculos.module').then( m => m.VerVehiculosPageModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
