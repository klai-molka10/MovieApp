import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MoviesService } from './services/movies.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movieApp';
  movies: any[] = [];
  topRatedMovies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  query: string = '';
  selectedLanguage: string = 'en'; // Default language
  showTopRatedMovies: boolean = true;


  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private router: Router
  ) { // Subscribe to router events to track navigation changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route and hide the top-rated list if it's login or signup
        if (this.router.url === '/' || this.router.url === '/home') {
          this.showTopRatedMovies = true; // Show on home or initial page
        } else {
          this.showTopRatedMovies = false; // Hide on other pages
        }
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      this.loadMovies(this.query, this.currentPage, this.selectedLanguage);
      this.fetchTopRatedMovies();
    });

    // Subscribe to language changes
    this.translate.onLangChange.subscribe(() => {
      this.loadMovies(this.query, this.currentPage, this.selectedLanguage);
      this.loadTopRatedMovies(this.currentPage, this.selectedLanguage); // Load top-rated movies on language change
      this.fetchTopRatedMovies(); // Reload top-rated movies with new language
    });

    // Load the top-rated movies on initialization
    this.loadTopRatedMovies(this.currentPage, this.selectedLanguage);
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

  loadTopRatedMovies(page: number, language: string): void {
    this.movieService.getTopRatedMovies(page, language).subscribe(
      data => {
        this.topRatedMovies = data.results;
        console.log('Top Rated Movies:', this.topRatedMovies);
      },
      error => {
        console.error('Error fetching top-rated movies:', error);
      }
    );
  }

  changeLanguage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLanguage = selectElement.value;
    this.translate.use(this.selectedLanguage);
    this.loadMovies(this.query, this.currentPage, this.selectedLanguage); // Reload movies with the new language
    this.loadTopRatedMovies(this.currentPage, this.selectedLanguage); // Reload top-rated movies with the new language
  }


  fetchTopRatedMovies(): void {
    // @ts-ignore
    this.movieService.getTopRatedMovies(this.selectedLanguage).subscribe(
      data => {
        this.topRatedMovies = data.results.filter((movie: { poster_path: any; vote_average: number; }) => movie.poster_path && movie.vote_average > 0);
      },
      error => {}
    );
  }

  getMoviePosterUrl(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500'; // w500 is a common width size for posters
    return `${baseUrl}${posterPath}`;
  }

}
