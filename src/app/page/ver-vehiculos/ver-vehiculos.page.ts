import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { StorageService } from 'src/app/service/storage.service';
import { NavController } from '@ionic/angular'; // Importar NavController

@Component({
  selector: 'app-ver-vehiculos',
  templateUrl: './ver-vehiculos.page.html',
  styleUrls: ['./ver-vehiculos.page.scss'],
})
export class VerVehiculosPage implements OnInit {
  email: string = '';
  vehiculos: any[] = []; // Lista de vehículos del usuario

  constructor(
    private activate: ActivatedRoute,
    private storage: StorageService,
    private apiservice: ApiService,
    private navCtrl: NavController // Para manejar la navegación del botón Volver
  ) {
    this.activate.queryParams.subscribe((params) => {
      this.email = params['email'];
      console.log('Email recibido:', this.email);
    });
  }

  ngOnInit() {
    this.ObtenerVehiculos();
  }

  // Método para obtener vehículos
  async ObtenerVehiculos() {
    try {
      // Obtiene el token desde el almacenamiento local
      const dataStorage = await this.storage.obtenerStorage();

      // Llama a la API para obtener vehículos
      const req = await this.apiservice.obtenerVehiculo({
        p_id: undefined, // No es obligatorio, se puede omitir
        token: dataStorage[0].token,
      });

      if (req && req.data.length > 0) {
        this.vehiculos = req.data; // Guarda los vehículos en la lista
        console.log('Vehículos cargados:', this.vehiculos);
      } else {
        console.error('No hay vehículos registrados.');
      }
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
    }
  }

  // Método para manejar el botón Volver
  volver() {
    this.navCtrl.navigateBack('/principal'); // Cambia la ruta según lo necesario
  }
}
