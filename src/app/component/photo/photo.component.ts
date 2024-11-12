import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent  implements OnInit {

  imageUrl: string | undefined;


  constructor() { 
    Camera.requestPermissions();
  }

  ngOnInit() {}
  
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri, // URL de la imagen
      source: CameraSource.Camera // Fuente: Cámara
    });

    this.imageUrl = image.webPath; // Guardamos la URL de la imagen capturada
  }
}
