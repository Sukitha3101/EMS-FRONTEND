import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  name: string = '';
  password: string = '';
  email: string = '';
  role: string = 'ADMIN';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.resetFormFields();
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        if (response.status === 200) {
          this.userService.setUser(response);
          this.router.navigate(['/home']);
        } 
      },
      error => {
        this.showToast('Login failed. Please try again.');
      }
    );
  }

  onSignup() {
    this.authService.signup(this.name, this.email, this.role, this.password).subscribe(
      response => {
        if (response.status === 200) {
          this.isLoginMode = true;
          this.resetFormFields();
          this.showToast('Signup successful! Please log in.');
        } 
      },
      error => {
        this.showToast('Email is already taken');
      }
    );
  }

  resetFormFields() {
    this.name = '';
    this.password = '';
    this.email = '';
    this.role = 'ADMIN';
  }

  showToast(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
