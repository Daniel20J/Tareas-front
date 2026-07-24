import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  success(title: string, text: string): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title,
      text,
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: '#ffffff',
      color: '#0f172a',
      iconColor: '#22c55e'
    });
  }

  error(title: string, text: string): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title,
      text,
      showConfirmButton: false,
      timer: 3200,
      timerProgressBar: true,
      background: '#ffffff',
      color: '#0f172a',
      iconColor: '#ef4444'
    });
  }

  async confirm(title: string, text: string): Promise<boolean> {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      background: '#ffffff',
      color: '#0f172a',
      iconColor: '#f59e0b',
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#cbd5e1',
      reverseButtons: true
    });

    return result.isConfirmed;
  }
}