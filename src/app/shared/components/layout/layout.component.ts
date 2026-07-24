import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  async cerrarSesion(): Promise<void> {
    const confirmar = await this.alertService.confirm('Cerrar sesión', '¿Deseas salir del sistema?');
    if (!confirmar) return;

    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
