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
  email: string = ''; // Email del usuario
  usuario: any = {}; // Datos del usuario cargado
  viajes: any[] = []; // Lista de viajes cargados
  vehiculos: any[] = []; // Lista de vehículos cargados
  viajeSeleccionado: any = null; // Datos del viaje seleccionado
  vehiculoSeleccionado: number | null = null; // ID del vehículo seleccionado
  p_id: number = 0; // ID del viaje
  p_id_estado: number = 0; // Nuevo estado del viaje
  token: string = ''; // Token del usuario

  constructor(
    private apiService: ApiService,
    private storage: StorageService,
    private activate: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {
    this.activate.queryParams.subscribe((params) => {
      this.email = params['email'] || ''; // Recupera el email
      this.p_id = +params['id_viaje'] || 0; // Recupera el id_viaje
      console.log('Email recibido:', this.email);
      console.log('ID del viaje recibido:', this.p_id);
    });
  }

  ngOnInit() {
    this.cargarUsuario(); // Cargar datos del usuario
  }

  // Método para cargar el usuario
  async cargarUsuario() {
    if (!this.email) {
      console.error('El email no está definido.');
      return;
    }

    try {
      const dataStorage = await this.storage.obtenerStorage(); // Obtiene el token del almacenamiento
      const req = await this.apiService.obtenerUsuario({
        p_correo: this.email,
        token: dataStorage[0]?.token,
      });

      if (req && req.data) {
        this.usuario = req.data[0];
        this.token = dataStorage[0]?.token;
        console.log('Usuario cargado:', this.usuario);

        this.cargarViajes(); // Cargar viajes del usuario
        this.cargarVehiculos(); // Cargar vehículos del usuario
      } else {
        console.error('No se encontraron datos del usuario.');
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    }
  }

  // Método para cargar los viajes asociados al usuario
  async cargarViajes() {
    if (!this.usuario?.id_usuario) {
      console.error('El ID del usuario no está disponible.');
      return;
    }

    try {
      const req = await this.apiService.obtenerViaje({
        p_id_usuario: this.usuario.id_usuario,
        token: this.token,
      });

      if (req && req.data) {
        this.viajes = req.data;
        console.log('Viajes cargados:', this.viajes);

        // Busca el viaje específico si `id_viaje` está disponible
        if (this.p_id) {
          this.viajeSeleccionado = this.viajes.find((viaje) => viaje.id_viaje === this.p_id);
          if (!this.viajeSeleccionado) {
            console.error(`El viaje con ID ${this.p_id} no fue encontrado.`);
          } else {
            console.log('Viaje seleccionado:', this.viajeSeleccionado);
          }
        }
      } else {
        console.error('No se encontraron viajes para este usuario.');
      }
    } catch (error) {
      console.error('Error al cargar viajes:', error);
    }
  }

  // Método para cargar los vehículos asociados al usuario
  async cargarVehiculos() {
    if (!this.usuario?.id_usuario) {
      console.error('El ID del usuario no está disponible.');
      return;
    }

    try {
      const req = await this.apiService.obtenerVehiculo({
        p_id: this.usuario.id_usuario,
        token: this.token,
      });

      if (req && req.data) {
        this.vehiculos = req.data;
        console.log('Vehículos cargados:', this.vehiculos);
      } else {
        console.error('No se encontraron vehículos registrados para este usuario.');
      }
    } catch (error) {
      console.error('Error al cargar vehículos:', error);
    }
  }

  // Manejar el cambio del vehículo seleccionado
  handleVehiculoChange(event: any) {
    this.vehiculoSeleccionado = event.detail.value;
    console.log('Vehículo seleccionado:', this.vehiculoSeleccionado);
  }

  // Método para actualizar el estado de un viaje
  async actualizarViaje() {
    if (!this.p_id || !this.p_id_estado || !this.vehiculoSeleccionado) {
      console.error('Faltan datos para actualizar el viaje.');
      alert('Por favor, completa todos los campos antes de actualizar el viaje.');
      return;
    }

    try {
      const response = await this.apiService.actualizarEstadoViaje({
        p_id: this.p_id,
        p_id_estado: this.p_id_estado,
        token: this.token,
      });

      console.log('Estado del viaje actualizado:', response);
      this.mostrarAlerta('Éxito', 'El estado del viaje ha sido actualizado correctamente.');
      this.router.navigate(['/ver-viajes'], { queryParams: { email: this.email } });
    } catch (error) {
      console.error('Error al actualizar el estado del viaje:', error);
      this.mostrarAlerta('Error', 'No se pudo actualizar el estado del viaje. Intenta nuevamente.');
    }
  }

  // Método para mostrar una alerta
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
