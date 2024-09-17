import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {
  movie: any = {};  // Initialize movie object as empty
  cast: any[] = [];
  isLoading = true;
  movieId: string | null = null;
  userId: number | null = null;
 
  query: string = '';
   // Declare userId

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
  
      this.movieId = params.get('id'); // Retrieve userId from query params
      
      if (this.movieId) {
        this.getMovieDetails(this.movieId);
      }
    });
    
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      this.userId = +params['userId']; // Retrieve userId from query params
    })

   
  }

  getMovieDetails(id: string): void {
    this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=bb994f195279f5e810d8a59a13fe49a5&language=en-US`)
      .subscribe(
        (data: any) => {
          this.movie = data;
          this.isLoading = false;
          this.getCast(id);  // Fetch cast information separately
        },
        error => {
          console.error('Erreur lors de la récupération des détails du film:', error);
          this.isLoading = false;
        }
      );
  }

  getCast(id: string): void {
    this.http.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=bb994f195279f5e810d8a59a13fe49a5`)
      .subscribe(
        (data: any) => {
          this.cast = data.cast
            .filter((actor: any) => actor.profile_path !== null)  // Exclude actors with null profile_path
            .slice(0, 10);  // Limit to 10 actors
        },
        error => {
          console.error('Erreur lors de la récupération des acteurs:', error);
        }
      );
  }

  goToRecommendation(): void {
    if (this.movie && this.movie.title && this.userId) {
      const movieName = this.movie.title;
      this.router.navigate(['/recommendation'], { queryParams: { movie_name: movieName, user_id: this.userId } });
    } else {
      console.error('Movie title or user ID is not available');
    }
  }
}
