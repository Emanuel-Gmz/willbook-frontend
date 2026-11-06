import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { BookListComponent } from './features/catalogo/book-list/book-list.component';
import { MisPrestamosComponent } from './features/perfil/mis-prestamos/mis-prestamos.component';
import { BookDetailComponent } from './features/catalogo/book-detail/book-detail.component';
import { GestionPrestamosComponent } from './features/admin/gestion-prestamos/gestion-prestamos.component';
import { GestionLibrosComponent } from './features/admin/gestion-libros/gestion-libros.component';
import { GestionMultasComponent } from './features/admin/gestion-multas/gestion-multas.component';
import { GestionCatalogosComponent } from './features/admin/gestion-catalogos/gestion-catalogos.component';
import { PerfilLectorComponent } from './features/admin/perfil-lector/perfil-lector.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { 
    path: 'auth', 
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { 
    path: 'catalogo', 
    component: BookListComponent 
  },
  { 
    path: 'mis-prestamos', 
    component: MisPrestamosComponent 
  },
  { 
    path: 'catalogo/:id', 
    component: BookDetailComponent 
  },
  { 
    path: 'admin/gestion-prestamos', 
    component: GestionPrestamosComponent 
  },
  { 
    path: 'admin/gestion-libros', 
    component: GestionLibrosComponent 
  },
  { path: 'admin/gestion-multas', 
    component: GestionMultasComponent 
  },
  { path: 'admin/gestion-catalogos', 
    component: GestionCatalogosComponent 
  },
  { 
  path: 'admin/perfil-lector/:id', 
  component: PerfilLectorComponent 
  },
  { path: '**', redirectTo: 'auth/login' }  
];