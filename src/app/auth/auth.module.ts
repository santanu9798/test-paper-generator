import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {EditQuestionDialogComponent} from '../edit-question-dialog/edit-question-dialog.component';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    EditQuestionDialogComponent
  ]
})
export class AuthModule {}
