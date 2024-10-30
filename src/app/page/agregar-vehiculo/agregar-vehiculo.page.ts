import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ApiService } from 'src/app/service/api.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserModel } from 'src/Models/Usuario';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
})
export class AgregarVehiculoPage implements OnInit {  

  constructor(
    private apiservice: ApiService,
    private storage: StorageService,
    private activate: ActivatedRoute,
    private router: Router 
  ) {
    this.activate.queryParams.subscribe(params => {
      this.email = params['email'];
      console.log(this.email);
    });
  }

  email: string = "";
  Usuario: UserModel[] = [];
  id_usuario: number = 0;
  patente: string = "";
  marca: string = "";
  modelo: string = "";
  anio: number = 0;
  color: string = "";
  tipo_combustible: string = "";
  archivoImagen: File | null = null;

  ngOnInit() {
    this.cargarUsuario();
  }

  onFileChange(event: any) {  
    if (event.target.files.length > 0) {
      this.archivoImagen = event.target.files[0];
    }
  }

  async registrarVehiculo() {
    try {
      let dataStorage = await this.storage.obtenerStorage(); 
      if (this.archivoImagen) {
        const request = await this.apiservice.agregarVehiculo(
          {
            p_id_usuario: this.Usuario[0].id_usuario,
            p_patente: this.patente,
            p_marca: this.marca,
            p_modelo: this.modelo,
            p_anio: this.anio,
            p_color: this.color,
            p_tipo_combustible: this.tipo_combustible,
            token: dataStorage[0].token,
          },
          this.archivoImagen
        );
      }
      this.router.navigate(['/login']); 
    } catch (error) {
      console.log(error);
    }
  }

  async cargarUsuario() {
    let dataStorage = await this.storage.obtenerStorage();    
    const req = await this.apiservice.obtenerUsuario({
      p_email: this.email,
      token: dataStorage[0].token,
    });
    this.Usuario = req.data;
    console.log("DATA INICIO USUARIO", this.Usuario);
  }
}
