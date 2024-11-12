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

  async obtenerVehiculo(){
    try {
      const params = {
        p_id: 25,
        token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI4Y2FjOTViNGE1YWNkZTBiOTY1NzJkZWU4YzhjOTVlZWU0OGNjY2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hpbmd1cm81NDEiLCJhdWQiOiJzaGluZ3VybzU0MSIsImF1dGhfdGltZSI6MTczMTM2OTE4MCwidXNlcl9pZCI6ImNwRHp1YVdDQWdmZkZEZDZyRXNHY3NXdnRqQjMiLCJzdWIiOiJjcER6dWFXQ0FnZmZGRGQ2ckVzR2NzV3Z0akIzIiwiaWF0IjoxNzMxMzY5MTgwLCJleHAiOjE3MzEzNzI3ODAsImVtYWlsIjoibmljb0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibmljb0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.e7nPg0G-jT5gBxR6HzmuR0s_GZPtqxRpK3U8Pyp455o9VSwaOYKHN_mK85sK_PyJeq8cOQ-er2iKGJbIFdFs7_nQUcDdqoE_diQSCK_JXHtMm6GvyIBDJUxQpLsMRHKGEn4_vfBIzMAf_vDtYX5NXZ-M35twFmaY9MlUQnekFewKVhIHzHBYfS6SQRTo518akoXuX_4VQ4nV4KJLziXZ8PGkBTxDS9bN5VuonuXHkYLHVrUn09-AB2emWp_eKeaWKiuj6iSOmO2dQmdcTriH4Ar6INqVD6GKX_O-vbIF-FlOaU3EiFigqQHmOYrAp4JjLKkcTDY6_6cPR0WGOl4DYw.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZHVvY3JpcXVlbG1lIiwiYXVkIjoiZHVvY3JpcXVlbG1lIiwiYXV0aF90aW1lIjoxNzI5OTY1NDU0LCJ1c2VyX2lkIjoic0RWZ3JrdFVIa2dSUGJ4SHNFemZyMFBnN25NMiIsInN1YiI6InNEVmdya3RVSGtnUlBieEhzRXpmcjBQZzduTTIiLCJpYXQiOjE3Mjk5NjU0NTQsImV4cCI6MTcyOTk2OTA1NCwiZW1haWwiOiJicEB2ZW50YW5hLmNsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImJwQHZlbnRhbmEuY2wiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.w_N76CliN4SJtlt_ZCprTU8_ioDvKO4WA3Cpp6ksU8_MQ_UfwUpONw267TO7zY_sUVXZwjHsnISsActSykUipTekwzmh1-bPjCW6YqVGgQ6bDzjGFiiykC4BvHLyU0sHuQRLZcsns3UKzXQmQMSxU_bFjNY_LrPnQ1dDx6Lc1DhsahR-qEnOYZCSQTbNS7zP8tO4VJyiAPoXjMivUO98ch-G2l1bgG6BMoBQDsDKQ16WjL6V-D50RKtiOv2z-IeT1TP0FYOcqlMTBUVccZeb6Sd1DiDj4gJMr_Y5DL5rAMSbjqhqI2C4phKayRBYnAEKNzV1Nfe15sbLSyRVtWpPbA'
      }
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + 'vehiculo/obtener',{params}));
      return response;
    } catch (error) {
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