import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

declare var google: any;  // Importar la librería de Google Maps

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  @ViewChild('map', { static: false }) mapElement!: ElementRef;  // Usar el operador "!" para asertar que no es nulo
  map: any;

  constructor() {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    const latLng = new google.maps.LatLng(-34.9290, 138.6010);  // Coordenadas de ejemplo

    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // Puedes agregar un marcador al mapa
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Mi ubicación'
    });
  }
}
