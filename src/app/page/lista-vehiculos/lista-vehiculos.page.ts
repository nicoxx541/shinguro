import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-lista-vehiculos',
  templateUrl: './lista-vehiculos.page.html',
  styleUrls: ['./lista-vehiculos.page.scss'],
})
export class ListaVehiculosPage implements OnInit {

  constructor(private apiservice:ApiService) { }


  vehiculos:any[]=[]; 

  ngOnInit() {
    this.btnObtenerVehiculos();
  }

  async btnObtenerVehiculos(){
    const req = await this.apiservice.obtenerVehiculo();

    this.vehiculos=req.data;
  }  


}
