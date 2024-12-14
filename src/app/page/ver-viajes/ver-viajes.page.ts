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
  email: string = ''; 
  usuario: UserModel[] = []; 
  viajes: any[] = []; 

  constructor(private router: Router, private activate: ActivatedRoute, private storage: StorageService, private apiservice: ApiService) {
    this.activate.queryParams.subscribe((params) => {
      this.email = params['email']; 
      console.log('Email recibido:', this.email);
    });
  }

  ngOnInit() {
    this.cargarUsuario(); 
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

        this.ObtenerViajes();
      } else {
        console.error('No se encontraron datos del usuario.');
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    }
  }

  async ObtenerViajes() {
    try {
      const dataStorage = await this.storage.obtenerStorage(); 
      const req = await this.apiservice.obtenerViaje({
        p_id_usuario: this.usuario[0]?.id_usuario, 
        token: dataStorage[0].token, 
      });

      if (req && req.data) {
        this.viajes = req.data; 
        console.log('Viajes obtenidos:', this.viajes);
      } else {
        console.error('No se encontraron viajes para este usuario.');
      }
    } catch (error) {
      console.error('Error al obtener viajes:', error);
    }
  }

  async seleccionarViaje(viaje: any) {
    const navigationExtras = {
      queryParams: {
        email: this.email,
        id_viaje: viaje.p_id, // ID del viaje seleccionado
      },
    };
    this.router.navigate(['/actualizar-viaje'], navigationExtras);
  }
  
}
