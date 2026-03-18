// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { RegisterForm } from './components/authentication/register/register-form/register-form';
import { LoginForm } from './components/authentication/login/login-form/login-form';
import { CatalogueComponent } from './components/catalogue/catalogue';
import { BookDetailComponent } from './components/book-detail/book-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogue', pathMatch: 'full' },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'register', component: RegisterForm },
  { path: 'login', component: LoginForm },
  { path: 'book/:id', component: BookDetailComponent }
];
