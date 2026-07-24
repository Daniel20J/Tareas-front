import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TareaService } from '../../../core/services/tarea.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-crear-tarea',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './crear-tarea.component.html',
  styleUrl: './crear-tarea.component.css'
})
export class CrearTareaComponent {

  formTarea: FormGroup;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.formTarea = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  guardarTarea(): void {
    if (this.formTarea.invalid) {
      this.formTarea.markAllAsTouched();
      return;
    }

    this.cargando = true;

    this.tareaService.crearTarea(this.formTarea.value).subscribe({
      next: (response) => {
        this.cargando = false;
        this.alertService.success('Correcto', response.mensaje);
        this.router.navigate(['/tareas']);
      },
      error: () => {
        this.cargando = false;
        this.alertService.error('Error', 'No se pudo crear la tarea.');
      }
    });
  }
}