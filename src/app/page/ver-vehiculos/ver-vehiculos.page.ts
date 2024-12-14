import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { StorageService } from 'src/app/service/storage.service';
import { NavController } from '@ionic/angular'; // Importar NavController
import { UserModel } from 'src/Models/Usuario';

@Component({
  selector: 'app-ver-vehiculos',
  templateUrl: './ver-vehiculos.page.html',
  styleUrls: ['./ver-vehiculos.page.scss'],
})
export class VerVehiculosPage implements OnInit {
  email: string = '';
  usuario: UserModel[] = []; // Datos del usuario
  vehiculos: any[] = []; // Lista de vehículos del usuario

  constructor(
    private activate: ActivatedRoute,
    private storage: StorageService,
    private apiservice: ApiService,
    private navCtrl: NavController 
  ) {
    this.activate.queryParams.subscribe((params) => {
      this.email = params['email'];
      console.log('Email recibido:', this.email);
    });
  }

  ngOnInit() {
    this.ObtenerVehiculos();
    this.cargarUsuario
  }

  async cargarUsuario() {
    try {
      const dataStorage = await this.storage.obtenerStorage(); 
      const req = await this.apiservice.obtenerUsuario({
        p_correo: this.email, 
        token: dataStorage[0].token, 
      });

      if (req && req.data) {
        this.usuario = req.data;
        console.log('Usuario cargado:', this.usuario);
      } else {
        console.error('No se encontraron datos del usuario.');
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    }
  }

  async ObtenerVehiculos() {
    try {
      const dataStorage = await this.storage.obtenerStorage();
      const reqvehiculo = await this.apiservice.obtenerUsuario({
        p_correo: this.email, 
        token: dataStorage[0].token, 
      });
      this.usuario = reqvehiculo.data;
      console.log('id usuario:', this.usuario[0].id_usuario);

      const req = await this.apiservice.obtenerVehiculo({
        p_id: this.usuario[0].id_usuario,
        token: dataStorage[0].token,
      });

      if (req && req.data.length > 0) {
        this.vehiculos = req.data; 
        console.log('Vehículos cargados:', this.vehiculos);
      } else {
        console.error('No hay vehículos registrados.');
      }
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
    }
  }
}
