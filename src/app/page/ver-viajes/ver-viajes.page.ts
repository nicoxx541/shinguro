import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserModel } from 'src/Models/Usuario';

@Component({
  selector: 'app-ver-viajes',
  templateUrl: './ver-viajes.page.html',
  styleUrls: ['./ver-viajes.page.scss'],
})
export class VerViajesPage implements OnInit {
  email: string = ''; // Email del usuario recibido como parámetro
  usuario: UserModel[] = []; // Datos del usuario
  viajes: any[] = []; // Lista de viajes obtenidos

  constructor(
    private router: Router,
    private activate: ActivatedRoute,
    private storage: StorageService,
    private apiservice: ApiService
  ) {
    this.activate.queryParams.subscribe((params) => {
      this.email = params['email']; // Obtenemos el email del usuario
      console.log('Email recibido:', this.email);
    });
  }

  ngOnInit() {
    this.cargarUsuario(); // Cargar datos del usuario al iniciar
  }

  // Método para cargar datos del usuario
  async cargarUsuario() {
    try {
      const dataStorage = await this.storage.obtenerStorage(); // Obtenemos el token desde el storage
      const req = await this.apiservice.obtenerUsuario({
        p_correo: this.email, // Correo del usuario
        token: dataStorage[0].token, // Token de autenticación
      });

      if (req && req.data) {
        this.usuario = req.data;
        console.log('Usuario cargado:', this.usuario);

        // Ahora cargamos los viajes del usuario
        this.ObtenerViajes();
      } else {
        console.error('No se encontraron datos del usuario.');
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    }
  }

  // Método para obtener los viajes del usuario
  async ObtenerViajes() {
    try {
      const dataStorage = await this.storage.obtenerStorage(); // Obtenemos el token desde el storage
      const req = await this.apiservice.obtenerViaje({
        p_id_usuario: this.usuario[0]?.id_usuario, // ID del usuario
        token: dataStorage[0].token, // Token de autenticación
      });

      if (req && req.data) {
        this.viajes = req.data; // Guardamos los viajes en la lista
        console.log('Viajes obtenidos:', this.viajes);
      } else {
        console.error('No se encontraron viajes para este usuario.');
      }
    } catch (error) {
      console.error('Error al obtener viajes:', error);
    }
  }
}
