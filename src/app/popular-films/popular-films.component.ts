import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-films',
  templateUrl: './popular-films.component.html',
  styleUrl: './popular-films.component.css'
})
export class PopularFilmsComponent  implements OnInit {
  movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=bb994f195279f5e810d8a59a13fe49a5&page=${this.currentPage}`;
    this.http.get(url).subscribe((response: any) => {
      this.movies = response.results;
      this.totalPages = response.total_pages;
    });
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.getMovies();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getMovies();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getMovies();
    }
  }
}
