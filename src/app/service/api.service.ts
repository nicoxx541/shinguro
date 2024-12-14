import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  apiURL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(this.apiURL + '/posts/').pipe(retry(3));
  }

  getPost(id: any): Observable<any> {
    return this.http.get(this.apiURL + '/posts/' + id).pipe(retry(3));
  }

  createPost(post: any): Observable<any> {
    return this.http
      .post(this.apiURL + '/posts/', post, this.httpOptions)
      .pipe(retry(3));
  }

  updatePost(id: any, post: any): Observable<any> {
    return this.http
      .put(this.apiURL + '/posts/' + id, post, this.httpOptions)
      .pipe(retry(3));
  }

  deletePost(id: any): Observable<any> {
    return this.http.delete(this.apiURL + '/posts/' + id, this.httpOptions);
  }

  async agregarUsuario(data: bodyUser, imageFile: File) {
    try {
      const formData = new FormData();
      formData.append('p_nombre', data.p_nombre);
      formData.append('p_correo_electronico', data.p_correo_electronico);
      formData.append('p_telefono', data.p_telefono);
      if (data.token) {
        formData.append('token', data.token);
      }
      if (imageFile) {
        formData.append('image_usuario', imageFile, imageFile.name);
      }
      const response = await lastValueFrom(
        this.http.post<any>(environment.apiUrl + 'user/agregar', formData)
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async agregarVehiculo(data: bodyVehiculo, imageFile: File) {
    try {
      const formData = new FormData();
      formData.append('p_id_usuario', data.p_id_usuario.toString());
      formData.append('p_patente', data.p_patente);
      formData.append('p_marca', data.p_marca);
      formData.append('p_modelo', data.p_modelo);
      formData.append('p_anio', data.p_anio.toString());
      formData.append('p_color', data.p_color);
      formData.append('p_tipo_combustible', data.p_tipo_combustible);
      if (data.token) {
        formData.append('token', data.token);
      }
      if (imageFile) {
        formData.append('image', imageFile, imageFile.name);
      }
      const response = await lastValueFrom(
        this.http.post<any>(environment.apiUrl + 'vehiculo/agregar', formData)
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async obtenerUsuario(data:dataGetUser){
    try {
      const params = {
        p_correo: data.p_correo,
        token:data.token
      }
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + 'user/obtener',{params}));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async obtenerViaje(data: dataGetViaje) {
    try {
      const params = {
        p_id_usuario: data.p_id_usuario,
        token: data.token,
      };
      const response = await lastValueFrom(
        this.http.get<any>(environment.apiUrl + 'viaje/obtener', { params })
      );
      return response;
    } catch (error) {
      throw error; 
    }
  }

  async obtenerVehiculo(data: { p_id?: number; token: string }) {
    try {
      const params: any = { token: data.token };
  
      if (data.p_id) {
        params.p_id = data.p_id;
      }
  
      console.log('Parámetros enviados a la API:', params);
  
      const apiUrl = `${environment.apiUrl.replace(/\/+$/, '')}/vehiculo/obtener`;
  
      const response = await lastValueFrom(
        this.http.get<any>(apiUrl, { params })
      );
  
      return response;
    } catch (error) {
      console.error('Error en obtenerVehiculo:', error);
      throw error;
    }
  }

  async agregarViaje(datosViaje:bodyViaje){
    try {
      
      const body = {
        p_id_usuario: datosViaje.p_id_usuario,
        p_ubicacion_origen: datosViaje.p_ubicacion_origen,
        p_ubicacion_destino: datosViaje.p_ubicacion_destino,
        p_costo: datosViaje.p_costo,
        p_id_vehiculo: datosViaje.p_id_vehiculo,
        token: datosViaje.token
      };
      const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'viaje/agregar', body));
      return response;
    } catch (error) {
      console.log(error)
      throw error
    }
  }  


 async actualizarEstadoViaje(data: { p_id: number; p_id_estado: number; token: string }) {
  try {
    const body = {
      p_id: data.p_id,
      p_id_estado: data.p_id_estado,
      token: data.token,
    };

    console.log('Datos enviados al API:', body);

    const response = await lastValueFrom(
      this.http.post<any>(environment.apiUrl + 'viaje/actualiza_estado_viaje', body)
    );

    return response;
  } catch (error) {
    console.error('Error en actualizarEstadoViaje:', error);
    throw error;
  }
}

  
  
}

interface bodyUser {
  p_nombre: string;
  p_correo_electronico: string;
  p_telefono: string;
  token?: string;
}

interface dataGetUser{
  p_correo:string;
  token:string;
}

interface bodyVehiculo {
  p_id_usuario: number;
  p_patente: string;
  p_marca: string;
  p_modelo: string;
  p_anio: number;
  p_color: string;
  p_tipo_combustible: string;
  token: string;
}

interface dataGetVehiculo {
  p_id: number;
  token: string;
}

interface bodyViaje {
  p_id_usuario: number;
  p_ubicacion_origen:string;
  p_ubicacion_destino: string;
  p_costo: number;
  p_id_vehiculo: number;
  token: string
}

interface dataGetViaje {
  p_id_usuario: number;
  token: string;
}





