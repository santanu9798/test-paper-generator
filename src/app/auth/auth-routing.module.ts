import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {LogoutComponent} from './logout/logout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login - Test Paper Generator' },
  { path: 'register', component: RegistrationComponent, title: 'Register - Test Paper Generator' },
  { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Forgot Password - Test Paper Generator' },
  { path: 'logout', component: LogoutComponent, title: 'Logout - Test Paper Generator' },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
