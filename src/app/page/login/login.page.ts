import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/service/firebase.service';
import { StorageService } from 'src/app/service/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email= ""
  password= ""
  tokenID: any = "";

  constructor(private firebase:FirebaseService, private router: Router, private alertcontroller:AlertController, private storage: StorageService) { }

  ngOnInit() {
  }

  async login(){
    try{
      let usuario=await this.firebase.auth(this.email, this.password);
      this.tokenID = await usuario.user?.getIdToken();
      console.log("token",await usuario.user?.getIdToken()) 
      console.log(usuario);
      const navigationExtras: NavigationExtras ={
        queryParams: {email: this.email, password: this.password}
      };
      this.router.navigate(['/principal'], navigationExtras);
      this.pruebaStorage();
    } catch(error){
      console.log(error);
      this.popAlert();
    }
  }
  async popAlert(){
    const alert=await this.alertcontroller.create({
      header:'error',
      message:"Usuario o contraseña incorrecto",
      buttons:[' OK']
    })
    await alert.present();
  }

  async pruebaStorage(){
    const jsonToken:any=[
      {
        "token":this.tokenID
      },
      {
        "email":this.email
      }
    ];
    this.storage.agregarStorage(jsonToken);
    console.log(await this.storage.obtenerStorage());
  }
}
