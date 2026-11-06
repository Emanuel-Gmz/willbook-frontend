import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { BookListComponent } from './features/catalogo/book-list/book-list.component';
import { MisPrestamosComponent } from './features/perfil/mis-prestamos/mis-prestamos.component';
import { BookDetailComponent } from './features/catalogo/book-detail/book-detail.component';

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
  { path: '**', redirectTo: 'auth/login' }  
];