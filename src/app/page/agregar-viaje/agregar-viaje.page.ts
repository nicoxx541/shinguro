import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { StorageService } from 'src/app/service/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-viaje',
  templateUrl: './agregar-viaje.page.html',
  styleUrls: ['./agregar-viaje.page.scss'],
})
export class AgregarViajePage implements OnInit {
  ubicacionOrigen: string = '';
  ubicacionDestino: string = '';
  costo: number = 0;
  vehiculos: any[] = [];
  idUsuario: number = 0; // ID del usuario

  constructor(
    private apiservice: ApiService,
    private storage: StorageService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarUsuario(); // Cargar usuario y vehículos
  }

  async cargarUsuario() {
    try {
      // Obtiene los datos del almacenamiento local
      const dataStorage = await this.storage.obtenerStorage();
  
      // Verifica que estás obteniendo correctamente el token y el correo
      console.log('Token obtenido:', dataStorage[0]?.token);
      console.log('Correo obtenido:', dataStorage[0]?.email);
  
      // Llama a la API para obtener los datos del usuario
      const usuarioResponse = await this.apiservice.obtenerUsuario({
        p_correo: dataStorage[0]?.email,
        token: dataStorage[0]?.token,
      });
  
      if (usuarioResponse.data.length > 0) {
        this.idUsuario = usuarioResponse.data[0].id_usuario;
  
        // Verifica que los datos del usuario están cargados
        console.log('Usuario cargado:', usuarioResponse.data[0]);
      } else {
        console.error('No se encontró información del usuario.');
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    }
  }
  

  async registrarViaje() {
  try {
    const dataStorage = await this.storage.obtenerStorage();

    // Verifica que el token y el usuario estén cargados
    console.log('Token disponible para el viaje:', dataStorage[0]?.token);
    console.log('ID del usuario:', this.idUsuario);

    const request = {
      p_id_usuario: this.idUsuario,
      p_ubicacion_origen: this.ubicacionOrigen.trim(),
      p_ubicacion_destino: this.ubicacionDestino.trim(),
      p_costo: this.costo,
      p_id_vehiculo: this.vehiculos[0]?.id_vehiculo,
      token: dataStorage[0]?.token,
    };

    console.log('Datos enviados al backend:', request);

    const response = await this.apiservice.agregarViaje(request);
    console.log('Respuesta del servidor:', response);

    this.mostrarAlerta('Éxito', 'El viaje se ha registrado correctamente.');
  } catch (error) {
    console.error('Error al registrar viaje:', error);
    this.mostrarAlerta('Error', 'No se pudo registrar el viaje.');
  }
}

  async mostrarAlerta(header: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
