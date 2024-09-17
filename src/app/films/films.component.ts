import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  movies: any[] = [];
  selectedOption: string = '';
 
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMovies('top_rated'); // Default to top rated on load
  }

  fetchMovies(option: string): void {
    let apiUrl = '';

    if (option === 'top_rated') {
      apiUrl = 'https://api.themoviedb.org/3/tv/top_rated?api_key=bb994f195279f5e810d8a59a13fe49a5';
    } else if (option === 'popular') {
      apiUrl = 'https://api.themoviedb.org/3/tv/popular?api_key=bb994f195279f5e810d8a59a13fe49a5&language=en-US';
    }

    this.http.get(apiUrl).subscribe((response: any) => {
      this.movies = response.results;
    });
  }

  onOptionChange(option: string): void {
    this.selectedOption = option;
    this.fetchMovies(option);
  }
}