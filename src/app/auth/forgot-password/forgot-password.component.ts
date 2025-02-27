import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Password reset link sent to your email.';
        console.log('Forgot password request successful:', response);
      },
      error: (err) => {
        this.errorMessage = 'Request failed: ' + (err.error?.message || 'Try again');
        console.error('Forgot password error:', err);
      }
    });
  }
}
