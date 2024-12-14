import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserModel } from 'src/Models/Usuario';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-viaje',
  templateUrl: './agregar-viaje.page.html',
  styleUrls: ['./agregar-viaje.page.scss'],
})
export class AgregarViajePage implements OnInit {

  constructor(private apiservice:ApiService, private storage:StorageService,private activate:ActivatedRoute,private router:Router) { 
    this.activate.queryParams.subscribe(params => {
      this.email = params['email'];
      console.log(this.email)
    })
  }

  email: string="";
  ubicacion_origen:string = "";
  ubicacion_destino:string = "";
  costo:number = 0;
  usuario:UserModel[] = [];
  viajes:any[] = [];
  vehiculoSeleccionado:string = "";
  vehiculos: any[] = [];
  
  ngOnInit() {
    this.ObtenerVehiculos();
    this.cargarUsuario
  }

  async cargarUsuario(){
    let dataStorage = await this.storage.obtenerStorage();

    const req = await this.apiservice.obtenerUsuario(
      {
        p_correo: dataStorage[0].usuario_correo,
        token: dataStorage[0].token
      }
    );
    this.usuario = req.data;
    console.log("Usuario cargado: ", this.usuario)
  }

  compareWith(o1:any, o2:any) {
    console.log("comparando: " ,o1, o2)
    return JSON.stringify(o1) === JSON.stringify(o2);;
  }

  handleChange(ev:any) {
    this.vehiculoSeleccionado = ev.target.value.id_vehiculo
    return this.vehiculoSeleccionado;
  }

  async cargarViaje(){
    let dataStorage = await this.storage.obtenerStorage();

    const req = await this.apiservice.obtenerViaje(dataStorage[0].token)
    this.viajes = req.data;

 }

  async agregarViaje() {
    if (!this.ubicacion_origen || !this.ubicacion_destino || !this.costo || !this.vehiculoSeleccionado) {
      alert('Por favor, completa todos los campos antes de registrar el viaje.');
      return;
    }
    try {
      const dataStorage = await this.storage.obtenerStorage();
      const token = dataStorage[0]?.token;
  
      if (!token) {
        alert('No se encontró un token válido. Por favor, inicia sesión nuevamente.');
        return;
      }
      console.log('Id seleccionado: ', this.vehiculoSeleccionado);
      
      const req = await this.apiservice.agregarViaje({
        p_id_usuario: this.usuario[0]?.id_usuario,
        p_ubicacion_origen: this.ubicacion_origen,
        p_ubicacion_destino: this.ubicacion_destino,
        p_costo: this.costo,
        p_id_vehiculo: parseInt(this.vehiculoSeleccionado), 
        token: token,
      });

      alert('Viaje registrado exitosamente.');
      console.log('Respuesta de la API:', req);
  
      this.limpiarFormulario();
    } catch (error) {
      console.error('Error al registrar el viaje:', error);
      alert('Ocurrió un error al registrar el viaje. Por favor, intenta nuevamente.');
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

limpiarFormulario() {
  this.ubicacion_origen = '';
  this.ubicacion_destino = '';
  this.costo = 0;
  this.vehiculoSeleccionado = '';
}
}