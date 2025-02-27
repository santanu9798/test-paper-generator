import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.authService.register(this.fullName, this.email, this.password).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Registration successful! Please log in.';
        console.log('Registration successful:', response);
        setTimeout(() => this.router.navigate(['/auth/login']), 2000); // Redirect after 2s
      },
      error: (err) => {
        this.errorMessage = 'Registration failed: ' + (err.error?.message || 'Try again');
        console.error('Registration error:', err);
      }
    });
  }
}
