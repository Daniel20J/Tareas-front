import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  resumen = {
    total: 24,
    completadas: 15,
    pendientes: 9,
    productividad: 63
  };

  barrasSemanales = [
    { dia: 'Lun', valor: 4 },
    { dia: 'Mar', valor: 7 },
    { dia: 'Mié', valor: 5 },
    { dia: 'Jue', valor: 8 },
    { dia: 'Vie', valor: 6 },
    { dia: 'Sáb', valor: 3 },
    { dia: 'Dom', valor: 2 }
  ];

  actividadReciente = [
    { titulo: 'Diseñar pantalla de login', estado: 'Completada', clase: 'ok' },
    { titulo: 'Crear API de tareas', estado: 'En progreso', clase: 'progress' },
    { titulo: 'Validar formulario de edición', estado: 'Pendiente', clase: 'pending' },
    { titulo: 'Probar flujo de cierre de sesión', estado: 'Completada', clase: 'ok' },
    { titulo: 'Maquetar dashboard principal', estado: 'En progreso', clase: 'progress' }
  ];

  calendario = {
    mes: 'Abril 2026',
    dias: [
      ['', '', '', '1', '2', '3', '4'],
      ['5', '6', '7', '8', '9', '10', '11'],
      ['12', '13', '14', '15', '16', '17', '18'],
      ['19', '20', '21', '22', '23', '24', '25'],
      ['26', '27', '28', '29', '30', '', '']
    ],
    hoy: '15'
  };

  constructor(public authService: AuthService) {}

  get porcentajeCompletadas(): number {
    return Math.round((this.resumen.completadas / this.resumen.total) * 100);
  }

  get porcentajePendientes(): number {
    return 100 - this.porcentajeCompletadas;
  }

  get chartDegrees(): string {
    return `${this.porcentajeCompletadas * 3.6}deg`;
  }

  get maxBarValue(): number {
    return Math.max(...this.barrasSemanales.map(x => x.valor));
  }

}
