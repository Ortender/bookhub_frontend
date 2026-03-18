import { Routes } from '@angular/router';
import { RegisterForm } from './components/authentication/register/register-form/register-form';
import { LoginForm } from './components/authentication/login/login-form/login-form';

export const routes: Routes = [
    {path: 'register', component: RegisterForm},
    {path: 'login', component: LoginForm}
];
