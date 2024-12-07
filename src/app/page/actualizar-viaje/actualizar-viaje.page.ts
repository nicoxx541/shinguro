import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { StorageService } from 'src/app/service/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar-viaje',
  templateUrl: './actualizar-viaje.page.html',
  styleUrls: ['./actualizar-viaje.page.scss'],
})
export class ActualizarViajePage implements OnInit {
  email: string = '';
  usuario: any = {};
  p_id_viaje: number = 0; // ID del viaje a actualizar
  p_id_estado: number = 0; // Nuevo estado del viaje
  token: string = '';

  constructor(
    private apiservice: ApiService,
    private storage: StorageService,
    private activate: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {
    this.activate.queryParams.subscribe((params) => {
      this.email = params['email'];
      console.log('Email recibido:', this.email);
    });
  }

  ngOnInit() {
    this.cargarUsuario();
  }

  // Cargar datos del usuario
  async cargarUsuario() {
    try {
      const dataStorage = await this.storage.obtenerStorage();
      const req = await this.apiservice.obtenerUsuario({
        p_correo: this.email,
        token: dataStorage[0].token,
      });

      if (req && req.data) {
        this.usuario = req.data[0]; // Suponemos que es un único usuario
        console.log('Usuario cargado:', this.usuario);
      } else {
        this.mostrarAlerta('Error', 'No se encontró el usuario.');
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      this.mostrarAlerta('Error', 'Ocurrió un problema al cargar el usuario.');
    }
  }

  // Actualizar el estado del viaje
  async actualizarViaje() {
    try {
      const dataStorage = await this.storage.obtenerStorage();

      const request = await this.apiservice.actualizarViaje({
        p_id: this.p_id_viaje,
        p_id_estado: this.p_id_estado,
        token: dataStorage[0].token,
      });

      console.log('Estado del viaje actualizado:', request);
      this.mostrarAlerta('Éxito', 'El estado del viaje se ha actualizado correctamente.');
      this.router.navigateByUrl('principal'); // Navegar a la página principal
    } catch (error) {
      console.error('Error al actualizar viaje:', error);
      this.mostrarAlerta('Error', 'No se pudo actualizar el estado del viaje. Intenta nuevamente.');
    }
  }

  // Mostrar alerta
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
