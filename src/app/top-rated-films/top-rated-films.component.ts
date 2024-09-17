import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-rated-films',
  templateUrl: './top-rated-films.component.html',
  styleUrl: './top-rated-films.component.css'
})
export class TopRatedFilmsComponent implements OnInit  {
  movies: any[] = [];
  currentPage: number = 1; // Page actuelle
  totalPages: number = 1;  // Nombre total de pages

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadMovies(this.currentPage);

  }

  loadMovies(page: number): void {
    this.http.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=bb994f195279f5e810d8a59a13fe49a5&page=${page}`)
      .subscribe((response: any) => {
        this.movies = response.results;
        this.totalPages = response.total_pages; // Total des pages
      });
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadMovies(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }
}
