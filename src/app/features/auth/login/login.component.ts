import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin: FormGroup;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      usuarioLogin: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    this.cargando = true;

    this.authService.login(this.formLogin.value).subscribe({
      next: (response) => {
        this.cargando = false;

        if (response.estatus && response.data?.token) {
          this.router.navigate(['/dashboard']);
        } else {
          this.alertService.error('Error', response.error || response.mensaje);
        }
      },
      error: (error) => {
        this.cargando = false;
        this.alertService.error('Error', error?.error?.error || 'No se pudo iniciar sesión.');
      }
    });
  }

}
