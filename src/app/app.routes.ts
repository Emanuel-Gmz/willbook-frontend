import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { BookListComponent } from './features/catalogo/book-list/book-list.component';
import { MisPrestamosComponent } from './features/perfil/mis-prestamos/mis-prestamos.component';
import { BookDetailComponent } from './features/catalogo/book-detail/book-detail.component';
import { GestionPrestamosComponent } from './features/prestamos/gestion-prestamos.component';
import { GestionLibrosComponent } from './features/libros/gestion-libros.component';
import { GestionMultasComponent } from './features/multas/gestion-multas.component';
import { GestionCatalogosComponent } from './features/catalogo/gestion-catalogos/gestion-catalogos.component';
import { PerfilLectorComponent } from './features/perfil-lector/perfil-lector.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { Role } from './core/models/user';

export const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  
  // Públicas
  { 
     path: 'auth', 
     children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },

  // Privadas (Requieren estar logueado - authGuard)
  { path: 'catalogo', component: BookListComponent, canActivate: [authGuard] },
  { path: 'catalogo/:id', component: BookDetailComponent, canActivate: [authGuard] },
  { path: 'mis-prestamos', component: MisPrestamosComponent, canActivate: [authGuard] },
  
  // Administrativas (Requieren rol específico - roleGuard)
  { 
    path: 'admin/gestion-prestamos', 
    component: GestionPrestamosComponent, 
    canActivate: [roleGuard], 
    data: { roles: [Role.ADMIN, Role.BIBLIOTECARIO] } 
  },
  { 
    path: 'admin/gestion-libros', 
    component: GestionLibrosComponent, 
    canActivate: [roleGuard], 
    data: { roles: [Role.ADMIN, Role.BIBLIOTECARIO] } 
  },
  { 
    path: 'admin/gestion-multas', 
    component: GestionMultasComponent, 
    canActivate: [roleGuard], 
    data: { roles: [Role.ADMIN, Role.BIBLIOTECARIO] } 
  },
  { 
    path: 'admin/gestion-catalogos', 
    component: GestionCatalogosComponent, 
    canActivate: [roleGuard], 
    data: { roles: [Role.ADMIN, Role.BIBLIOTECARIO] } 
  },
  { 
    path: 'admin/perfil-lector/:id', 
    component: PerfilLectorComponent, 
    canActivate: [roleGuard], 
    data: { roles: [Role.ADMIN, Role.BIBLIOTECARIO] } 
  },
  
  { path: '**', redirectTo: 'auth/login' }
];