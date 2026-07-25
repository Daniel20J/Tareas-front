import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response.model';
import { Tarea } from '../../shared/models/tarea.model';
import { TareaCreate } from '../../shared/models/tarea-create.model';
import { TareaUpdate } from '../../shared/models/tarea-update.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private readonly apiUrl = 'https://tareasbackend-iv56.onrender.com/api';

  constructor(private http: HttpClient) { }

  getTareas(): Observable<ApiResponse<Tarea[]>> {
    return this.http.get<ApiResponse<Tarea[]>>(`${this.apiUrl}/getTareas?t=${new Date().getTime()}`);
  }

  getTareaById(id: number): Observable<ApiResponse<Tarea>> {
    return this.http.get<ApiResponse<Tarea>>(`${this.apiUrl}/getTareasId/${id}?t=${new Date().getTime()}`);
  }

  crearTarea(data: TareaCreate): Observable<ApiResponse<Tarea>> {
    return this.http.post<ApiResponse<Tarea>>(`${this.apiUrl}/crearTarea`, data);
  }

  actualizarTarea(id: number, data: TareaUpdate): Observable<ApiResponse<Tarea>> {
    return this.http.put<ApiResponse<Tarea>>(`${this.apiUrl}/actualizarTarea/${id}`,data);
  }

  completarTarea(id: number): Observable<ApiResponse<null>> {
    return this.http.put<ApiResponse<null>>(`${this.apiUrl}/completarTarea/${id}`,{});
  }
}