import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  login() {
    this.errorMessage = ""; // Clear previous error message

    const bodyData = {
      email: this.email,
      password: this.password
    };

    this.http.post("http://localhost:8080/api/v1/user/login", bodyData)
      .subscribe({
        next: (resultData: any) => {
          if (resultData.message === "Email not exists") {
            this.errorMessage = "Email does not exist";
          } else if (resultData.message === "Login Success") {
            this.authService.setUser(resultData.userId); // Store user data and update authentication status
            this.router.navigateByUrl('/home?userId='+resultData.userId);
          } else {
            this.errorMessage = "Incorrect email or password";
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Login failed:', error);
          this.errorMessage = "An error occurred. Please try again later.";
        }
      });
  }
}
