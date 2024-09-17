import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add new headers
    const authReq = req.clone({
      withCredentials: true // Include credentials with each request
    });

    // Send the cloned request with headers to the next handler
    return next.handle(authReq).pipe(
      // Handle errors globally
      catchError((error: HttpErrorResponse) => {
        // Log the error or display a notification
        console.error('Error intercepted:', error);

        // Here you can add additional error handling, such as redirection to a login page if unauthorized
        if (error.status/200 !=0) {
          // Handle unauthorized errors
          console.error('Unauthorized access - Redirecting to login');
        }

        return throwError(() => error);
      })
    );
  }
}
