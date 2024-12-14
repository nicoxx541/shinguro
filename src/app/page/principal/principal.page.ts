import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { FirebaseService } from 'src/app/service/firebase.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserModel } from 'src/Models/Usuario';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  email: string = '';
  usuario: UserModel[] = []; 
  vehiculo: any[] = []; 

  constructor(
    private firebase: FirebaseService, 
    private router: Router, 
    private activate: ActivatedRoute, 
    private storage: StorageService, 
    private apiservice: ApiService, 
    private alertcontroller: AlertController
  ) {
    this.activate.queryParams.subscribe((params) => {
      this.email = params['email'];
      console.log('Email recibido:', this.email);
    });
  }

  ngOnInit() {
    this.cargarUsuario();
  }

  async logout() {
    await this.firebase.logout();
    this.router.navigateByUrl('/login');
  }

  async cargarUsuario() {
    try {
      const dataStorage = await this.storage.obtenerStorage();
      const req = await this.apiservice.obtenerUsuario({
        p_correo: this.email,
        token: dataStorage[0].token,
      });

      if (req && req.data.length > 0) {
        this.usuario = req.data;
        console.log('Usuario cargado:', this.usuario);
      } else {
        console.error('No se encontraron datos del usuario.');
        this.popAlert('Error', 'No se pudo cargar la información del usuario.');
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      this.popAlert('Error', 'Hubo un problema al cargar los datos del usuario.');
    }
  }

  async btnRegistrarVehiculo() {
    const navigationExtras: NavigationExtras = { queryParams: { email: this.email } };
    this.router.navigate(['/agregar-vehiculo'], navigationExtras);
  }

  async ObtenerVehiculos() {
    try {
      const dataStorage = await this.storage.obtenerStorage();
      const req = await this.apiservice.obtenerVehiculo({
        p_id: this.usuario[0].id_usuario,
        token: dataStorage[0].token,
      });

      if (req && req.data.length > 0) {
        this.vehiculo = req.data;
        console.log('Vehículos cargados:', this.vehiculo);

        const navigationExtras: NavigationExtras = { queryParams: { email: this.email } };
        this.router.navigate(['/ver-vehiculos'], navigationExtras);
      } else {
        console.error('No hay vehículos registrados.');
        this.popAlertNoVehiculos();
      }
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
      this.popAlertNoVehiculos();
    }
  }

  async AgregarViaje() {
    try {
      const dataStorage = await this.storage.obtenerStorage();
      const vehiculos = await this.apiservice.obtenerVehiculo({
        p_id: this.usuario[0].id_usuario,
        token: dataStorage[0].token,
      });

      if (vehiculos.data.length > 0) {
        const navigationExtras: NavigationExtras = {
          queryParams: { email: this.email, id_vehiculo: vehiculos.data[0].id_vehiculo },
        };
        this.router.navigate(['/agregar-viaje'], navigationExtras);
      } else {
        this.popAlertNoVehiculos();
      }
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
    }
  }

  async cargarViajes() {
    try {
      const dataStorage = await this.storage.obtenerStorage();
      const req = await this.apiservice.obtenerViaje({
        p_id_usuario: this.usuario[0].id_usuario,
        token: dataStorage[0].token,
      });

      if (req && req.data.length > 0) {
        console.log('Viajes cargados:', req.data);

        const navigationExtras: NavigationExtras = { queryParams: { email: this.email } };
        this.router.navigate(['/ver-viajes'], navigationExtras);
      } else {
        console.error('No hay viajes registrados.');
        this.popAlertNoViajes();
      }
    } catch (error) {
      console.error('Error al cargar viajes:', error);
      this.popAlertNoViajes();
    }
  }

  async popAlertNoVehiculos() {
    const alert = await this.alertcontroller.create({
      header: 'Sin Vehículos',
      message: 'No tienes vehículos registrados.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async popAlertNoViajes() {
    const alert = await this.alertcontroller.create({
      header: 'Sin Viajes',
      message: 'No tienes viajes registrados.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async popAlert(header: string, message: string) {
    const alert = await this.alertcontroller.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
