import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  constructor(
    private firebase: FirebaseService,
    private router: Router,
    private crearuser: ApiService,
    private alertcontroller: AlertController
  ) {}

  correo_electronico: string = "";
  password: string = "";
  nombre: string = '';
  telefono: string = '';
  token: string = '';
  archivoImagen: File | null = null;

  ngOnInit() {}

  async registrar() {
    // Verificación de campos requeridos
    if (!this.nombre || !this.correo_electronico || !this.password || !this.telefono) {
      this.popAlert("Por favor, completa todos los campos.");
      return;
    }

    try {
      let usuario = await this.firebase.registrar(this.correo_electronico, this.password);
      const token = await usuario.user?.getIdToken();

      if (this.archivoImagen) {
        await this.crearuser.agregarUsuario(
          {
            p_correo_electronico: this.correo_electronico,
            p_nombre: this.nombre,
            p_telefono: this.telefono,
            token: token,
          },
          this.archivoImagen
        );
      }
      console.log(usuario);
      this.router.navigateByUrl('login');
    } catch (error) {
      this.popAlert("Error al registrar el usuario. Intenta de nuevo.");
      console.error('Error en registro:', error);
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivoImagen = event.target.files[0];
    }
  }

  async popAlert(message: string = 'Usuario o Contraseña incorrecta') {
    const alert = await this.alertcontroller.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
