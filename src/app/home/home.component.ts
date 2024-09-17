import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nowPlayingMovies: any[] = [];
  private router: any;
  private upcomingMovies: any;
  showUpcoming: boolean | undefined;


  constructor(private moviesService: MoviesService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.fetchNowPlayingMovies();
    this.fetchUpcomingMovies();
    this.translate.setDefaultLang('en'); // Set default language
  }

  fetchNowPlayingMovies() {
    this.moviesService.getNowPlayingMovies().subscribe((data: any) => {
      this.nowPlayingMovies = data.results; // Assuming 'results' is the array of films
    });
  }
  fetchUpcomingMovies() {
    this.moviesService.getUpcomingMovies().subscribe((data: any) => {
      this.upcomingMovies = data.results; // Assuming 'results' is the array of films
    });
  }
  getMoviePosterUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  viewDetails(movieId: number): void {
    this.router.navigate(['/movie-details', movieId]);
  }
  hideUpcomingMovies() {
    setTimeout(() => {
      this.showUpcoming = false;
    }, 10000); // Hides after 10 seconds, adjust as needed
  }

}
