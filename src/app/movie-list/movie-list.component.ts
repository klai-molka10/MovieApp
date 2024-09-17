import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  query: string = '';
  selectedLanguage: string = 'en'; // Default language
  userId: string ='' // Variable to store userId

  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      this.userId = params['userId']; // Retrieve userId from query params
      this.loadMovies(this.query, this.currentPage, this.selectedLanguage);
    });

    // Subscribe to language changes
    this.translate.onLangChange.subscribe(() => {
      this.loadMovies(this.query, this.currentPage, this.selectedLanguage);
    });
  }

  loadMovies(query: string, page: number, language: string): void {
    this.movieService.getMovies(query, page, language).subscribe(
      data => {
        this.movies = data.results.filter((movie: { poster_path: any; vote_average: number; }) => movie.poster_path && movie.vote_average > 0);
        this.totalPages = data.total_pages;
      },
      error => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadMovies(this.query, this.currentPage, this.selectedLanguage);
    }
  }

  getMovieImage(movie: any): string {
    return movie.poster_path
      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
      : 'path/to/placeholder-image.jpg'; // Fallback image if poster_path is empty
  }

  onImageError(event: any): void {
    event.target.src = 'path/to/placeholder-image.jpg'; // Fallback image path
  }

  changeLanguage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLanguage = selectElement.value;
    this.translate.use(this.selectedLanguage);
    this.loadMovies(this.query, this.currentPage, this.selectedLanguage); // Reload movies with new language
  }
}