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
  usuario:UserModel[]=[];
  id_usuario: number=0;
  p_ubicacion_origen: string = '';
  p_ubicacion_destino: string = '';
  p_costo: number = 0;
  vehiculos: any[] = [];
  

  ngOnInit() {
    this.cargarUsuario(); 
    // Cargar usuario y vehículos
  }

  async cargarUsuario(){
    let dataStorage = await this.storage.obtenerStorage();    
    const req = await this.apiservice.obtenerUsuario(
      {
        p_correo: this.email,
        token:dataStorage[0].token
      }
    );
    this.usuario = req.data;
  }
  

  async registrarViaje() {
    let dataStorage = await this.storage.obtenerStorage();
  try {
    const request = await this.apiservice.agregarViaje(
      {
      p_id_usuario: this.usuario[0].id_usuario,
      p_ubicacion_origen: this.p_ubicacion_origen,
      p_ubicacion_destino: this.p_ubicacion_destino,
      p_costo: this.p_costo,
      p_id_vehiculo: this.vehiculos[0].id_vehiculo,
      token: dataStorage[0].token,
      }
    ); 

    this.router.navigateByUrl('principal');
  } catch (error) {
    console.log(error);
  }
}



}