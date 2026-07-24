import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ListadoTareasComponent } from './features/tareas/listado-tareas/listado-tareas.component';
import { CrearTareaComponent } from './features/tareas/crear-tarea/crear-tarea.component';
import { EditarTareaComponent } from './features/tareas/editar-tarea/editar-tarea.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'tareas', component: ListadoTareasComponent, canActivate: [authGuard] },
  { path: 'tareas/crear', component: CrearTareaComponent, canActivate: [authGuard] },
  { path: 'tareas/editar/:id', component: EditarTareaComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];