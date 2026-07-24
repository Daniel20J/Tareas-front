import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TareaService } from '../../../core/services/tarea.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-editar-tarea',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './editar-tarea.component.html',
  styleUrl: './editar-tarea.component.css'
})
export class EditarTareaComponent implements OnInit {

  formTarea!: FormGroup;
  tareaId: number = 0;
  cargando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tareaService: TareaService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formTarea = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    this.tareaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarTarea();
  }

  cargarTarea(): void {
    this.tareaService.getTareaById(this.tareaId).subscribe({
      next: (response) => {
        if (response.data) {
          this.formTarea.patchValue({
            titulo: response.data.titulo,
            descripcion: response.data.descripcion
          });
        }
      },
      error: () => {
        this.alertService.error('Error', 'No se pudo cargar la tarea.');
      }
    });
  }

  actualizarTarea(): void {
    if (this.formTarea.invalid) {
      this.formTarea.markAllAsTouched();
      return;
    }

    this.cargando = true;

    this.tareaService.actualizarTarea(this.tareaId, this.formTarea.value).subscribe({
      next: (response) => {
        this.cargando = false;
        this.alertService.success('Correcto', response.mensaje);
        this.router.navigate(['/tareas']);
      },
      error: () => {
        this.cargando = false;
        this.alertService.error('Error', 'No se pudo actualizar la tarea.');
      }
    });
  }
}