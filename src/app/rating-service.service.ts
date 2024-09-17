import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingServiceService {
  private apiUrl = 'http://localhost:8080/api/v1/ratings/submit';

  constructor(private http: HttpClient) { }

  submitRating(userId: number, movieId: number, rating: any): Observable<any> {
    if (userId !== undefined && movieId !== undefined && rating !== undefined) {
      const params = { 
        userId: userId.toString(), 
        movieId: movieId.toString(), 
        rating: rating.toString() 
      };
      return this.http.post<any>(this.apiUrl, null, { params });
    } else {
      console.error('Invalid parameters:', { userId, movieId, rating });
      return throwError('Invalid parameters');
    }
  }
}
