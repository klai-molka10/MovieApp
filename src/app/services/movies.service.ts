import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey = 'bb994f195279f5e810d8a59a13fe49a5'; // Consider moving this to environment file
  private apiUrl = 'https://api.themoviedb.org/3';

  private userId: number | null = null; // Store userId here

  constructor(private http: HttpClient) {}

  // Setter for userId
  setUserId(userId: number): void {
    this.userId = userId;
  }

  // Getter for userId
  getUserId(): number | null {
    return this.userId;
  }

  getRecommendations(movieId: string): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey);

    return this.http.get<any>(`${this.apiUrl}/movie/${movieId}/recommendations`, { params });
  }

  getMovies(query: string, page: number = 1, language: string = 'en'): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('query', query)
      .set('page', page.toString())
      .set('language', language);

    return this.http.get<any>(`${this.apiUrl}/search/movie`, { params });
  }

  getMovieTranslations(query: string, page: number, language: string = 'en'): Observable<any> {
    return this.getMovies(query, page, language); // Assuming the same endpoint is used for translations
  }

  getMovieDetails(movieId: string): Observable<any> {
    // Ensure the backend URL and endpoint are correct
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en'); // Example, adjust as necessary

    return this.http.get<any>(`${this.apiUrl}/movie/${movieId}`, { params });
  }

  getMostRatedFilms(): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey);

    return this.http.get<any>(`${this.apiUrl}/movie/top_rated`, { params });
  }

  getNowPlayingMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
  getUpcomingMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }


  getTopRatedMovies(page: number, language: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}&language=${language}`);
  }



}
