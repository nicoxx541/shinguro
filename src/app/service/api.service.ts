import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, lastValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content':'application/json',
      'Access-Control-Allow-Origin':'*'    
    })
  }
  apliUrl= 'http://jsonplaceholder.typicode.com'

  constructor(private http:HttpClient) { }

  getPosts():Observable<any>{
    return this.http.get(this.apliUrl+'/posts/').pipe(retry(3));
  }

  getPost(id:any):Observable<any>{
    return this.http.get(this.apliUrl+'/posts/'+id).pipe(retry(3));
  }

  createPost(post:any):Observable<any>{
    return this.http.post(this.apliUrl+'/posts/',post,this.httpOptions).pipe(retry(3));
  }

  updatePost(id:any,post:any):Observable<any>{
    return this.http.put(this.apliUrl+'/posts/'+id,post,this.httpOptions).pipe(retry(3));
  }
  deletePost(id:any):Observable<any>{
    return this.http.delete(this.apliUrl+'/posts/'+id,this.httpOptions)
  }

  async agregarUsuario(data: bodyUser, imageFile: File) {
    try {
      const formData = new FormData();
      formData.append('p_nombre', data.p_nombre);
      formData.append('p_email', data.p_email);
      formData.append('p_telefono', data.p_telefono);
      if (data.token) formData.append('token', data.token);
      if (imageFile) formData.append('image_usuario', imageFile, imageFile.name);

      // Log para confirmar datos enviados
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await lastValueFrom(
        this.http.post<any>(environment.apiUrl + 'user/agregar', formData)
      );
      return response;
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      if (error instanceof HttpErrorResponse) {
        console.error('Error del servidor:', error.status, error.message);
        console.log('Detalles del error:', error.error);
      }
      throw error;
    }
   }

   async obtenerUsuario(data:dataGetUser){
    try {
      const params = {
        p_email: data.p_email,
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
        p_id: 1000,
        token:"eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxOGY0ZGY5MmFkMTc1ZjZhMDMwN2FiNjVkOGY2N2YwNTRmYTFlNWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hpbmd1cm81NDEiLCJhdWQiOiJzaGluZ3VybzU0MSIsImF1dGhfdGltZSI6MTczMDA1NTk1MSwidXNlcl9pZCI6ImJsckR4Vm8xUmxlUGN2c0lWYlRvUGRseVRxTDIiLCJzdWIiOiJibHJEeFZvMVJsZVBjdnNJVmJUb1BkbHlUcUwyIiwiaWF0IjoxNzMwMDU1OTUxLCJleHAiOjE3MzAwNTk1NTEsImVtYWlsIjoibWF0aWFzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJtYXRpYXNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.fsWv2HW-LpIYZqf61I0QExgtfMjZqL2aqbYe2jAP-x00CxPrR2qkdean8hCAg7FuH_TAlpbBR7e8-P8Tv0OhzaLTgX9z_-3Px7L4USqPnySW5p2AvbUzoDt-SEvArajw5PLShakHd0ttYbLV-Ont8_idTt3sId3TU3KkMl1SQ-0lDL6OJJddeS5YP-E0N7aFHdHpz3xE_ZsrnNdASwgTzLkzkKO5e-G8f-oNT_5RP2eFV4LMeLcLOZrmdzJ8J4v_lyiv_5-islRxPDH7SUP-JVSQRD4ZOapxuSz0g-DtW4wUuxKmfllDOhpHmY7W03uLLJ1-tYecmOcqQ_P42X9pdg"
      }
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + 'vehiculo/obtener',{params}));
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
      formData.append('image_usuario', imageFile, imageFile.name);
     }

     const response = await lastValueFrom(
      this.http.post<any>(environment.apiUrl + 'vehiculo/agregar', formData)
     );
     return response;
    } catch (error) {
     throw error;
    }
   }
}
interface bodyUser {
  p_nombre: string;
  p_email: string;
  p_telefono: string;
  token?: string;
}

interface dataGetUser{
  p_email:string;
  token:string;
}

interface bodyVehiculo{
  p_id_usuario: number;
  p_patente: string;
  p_marca: string ;
  p_modelo: string ;
  p_anio: number;
  p_color: string;
  p_tipo_combustible: string;
  token : string;
}