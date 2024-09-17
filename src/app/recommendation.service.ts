import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private baseUrl: string = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getRecommendations(movie_name: string, user_id: number): Observable<any> {
    let params = new HttpParams().set('movie_name', movie_name).set('user_id', user_id.toString());
    return this.http.get(`${this.baseUrl}/recommendations`, { params });
  }
}