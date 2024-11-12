import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
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

  email: string="";
  usuario:UserModel[]=[];
  vehiculos:any[]=[]; 
  
  constructor(private firebase:FirebaseService, private router:Router, private activate:ActivatedRoute, private storage:StorageService, private apiservice:ApiService) { 
    this.activate.queryParams.subscribe(params => {
      this.email = params['email'];
      console.log(this.email)
    })
  }

  ngOnInit() {
    this.cargarUsuario();
  }

  async logout(){
    await this.firebase.logout();
    this.router.navigateByUrl("login");
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
    console.log("DATA INICIO USUARIO ", this.usuario);
  }

  async btnRegistrarVehiculo(){
    const navigationExtras:NavigationExtras = {
      queryParams: {email: this.email}
    };
    this.router.navigate(['/agregar-vehiculo'], navigationExtras);
  }

  async btnObtenerVehiculos(){
    this.vehiculos = await this.apiservice.obtenerVehiculo();
  }

}
