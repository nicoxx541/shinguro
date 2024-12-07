import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
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

  //url de ejemplo
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
        p_id_usuario: data.p_id_usuario, // ID del usuario (opcional o requerido según la lógica)
        token: data.token, // Token para la autenticación
      };
  
      // Realiza la solicitud GET con los parámetros
      const response = await lastValueFrom(
        this.http.get<any>(environment.apiUrl + 'viaje/obtener', { params })
      );
  
      return response; // Devuelve los datos al llamador
    } catch (error) {
      throw error; // Lanza el error para manejarlo en el componente
    }
  }

  async actualizarViaje(data: bodyActualizarViaje) {
    try {
      const response = await lastValueFrom(
        this.http.post<any>(`${environment.apiUrl}/viaje/actualiza_estado_viaje`, data)
      );
      return response;
    } catch (error) {
      console.error('Error al actualizar viaje:', error);
      throw new Error('No se pudo actualizar el estado del viaje. Intenta nuevamente.');
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
  
  async agregarViaje(data: {
    p_id_usuario: number;
    p_ubicacion_origen: string;
    p_ubicacion_destino: string;
    p_costo: number;
    p_id_vehiculo: number;
    token: string;
  }) {
    try {
      const apiUrl = `${environment.apiUrl}/viaje/agregar`;
  
      const response = await lastValueFrom(
        this.http.post<any>(apiUrl, data)
      );
  
      return response;
    } catch (error) {
      console.error('Error al realizar la solicitud al backend:', error);
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

interface bodyActualizarViaje {
  p_id: number; // ID único del viaje
  p_id_estado: number; // Estado del viaje (ejemplo: 1 = pendiente, 2 = completado)
  token: string; // Token del usuario
}


