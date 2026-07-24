import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { TareaService } from '../../../core/services/tarea.service';
import { AlertService } from '../../../core/services/alert.service';
import { Tarea } from '../../../shared/models/tarea.model';

@Component({
  selector: 'app-listado-tareas',
  standalone: true,
  imports: [RouterLink, SlicePipe],
  templateUrl: './listado-tareas.component.html',
  styleUrl: './listado-tareas.component.css'
})
export class ListadoTareasComponent implements OnInit {

  tareas: Tarea[] = [];
  cargando: boolean = false;

  constructor(
    private tareaService: TareaService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerTareas();
  }

  obtenerTareas(): void {
    this.cargando = true;

    this.tareaService.getTareas().subscribe({
      next: (response) => {
        this.tareas = response.data ?? [];
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.alertService.error('Error', 'No se pudieron cargar las tareas.');
      }
    });
  }

  editarTarea(id: number): void {
    this.router.navigate(['/tareas/editar', id]);
  }

  completarTarea(id: number): void {
    this.tareaService.completarTarea(id).subscribe({
      next: (response) => {
        this.alertService.success('Correcto', response.mensaje);
        this.obtenerTareas();
      },
      error: () => {
        this.alertService.error('Error', 'No se pudo completar la tarea.');
      }
    });
  }
}
