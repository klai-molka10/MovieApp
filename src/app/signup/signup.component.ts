import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string ="";
  email: string ="";
  password: string ="";
  constructor(private http: HttpClient,private router: Router )
  {
  }
  save()
  {
  
    let bodyData = {
      "username" : this.username,
      "email" : this.email,
      "password" : this.password
    };
    this.http.post("http://localhost:8080/api/v1/user/save",bodyData,{responseType: 'text'})  .subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert(resultData);
        this.router.navigate(['/home']);  // Corrected here for navigation
      },
      (error) => {
        if (error.status === 409) {  // Check for conflict status
          alert("Email already exists!");
        } else {
          alert("An error occurred during registration.");
        }
      }
    );
}
}