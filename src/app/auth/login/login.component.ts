import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    console.log("Request received");
    this.errorMessage = ''; // Reset error
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response.token);
        localStorage.setItem('token', response.token); // Store token (optional)
        this.router.navigate(['/dashboard'])
          .then(() => console.log('Navigated to dashboard'))
          .catch(err => console.error('Navigation failed:', err));
      },
      error: (err) => {
        this.errorMessage = 'Login failed: ' + (err.error?.message || 'Invalid credentials');
        console.error('Login error:', err);
      }
    });
  }
}
