import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFireAuthModule} from '@angular//fire/compat/auth'
import {AngularFireModule} from '@angular//fire/compat'
import { environment } from 'src/environments/environment';
import {provideHttpClient } from '@angular/common/http';
import { PhotoComponent } from './component/photo/photo.component';

@NgModule({
  declarations: [AppComponent,PhotoComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
