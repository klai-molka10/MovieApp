import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RatingServiceService } from '../rating-service.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  recommendedMovies: any[] = [];
  isLoading = true;
  userId: string='';  // Définir l'userId ici

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private ratingService: RatingServiceService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const movieName = params['movie_name'];
      this.userId = params['user_id'];  // Assigner l'userId ici
      if (movieName && this.userId) {
        this.fetchRecommendations(movieName, this.userId);
      } else {
        console.error('Nom du film ou ID de l\'utilisateur manquant');
      }
    });
  }

  fetchRecommendations(movieName: string, userId: string): void {
    const url = `http://127.0.0.1:5000/recommendations?movie_name=${movieName}&user_id=${userId}`;
    this.http.get<any[]>(url)
      .subscribe(
        (data) => {
          this.recommendedMovies = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Erreur lors de la récupération des recommandations:', error);
          this.isLoading = false;
        }
      );
  }

  rateMovie(movie: any, rating: number): void {
    movie.userRating = rating;  // Définir la note du film
  }

  submitRating(movie: any): void {
    const rating = movie.userRating;
    const movieId = movie.id;
    if (this.userId && movieId !== undefined && rating !== undefined) {
      this.ratingService.submitRating(parseInt(this.userId), movieId, rating)
        .subscribe(
          response => {
            console.log('Évaluation soumise avec succès:', response);
            alert('Évaluation soumise avec succès!');
          },
          error => {
            console.error('Erreur lors de la soumission de l\'évaluation:', error);
            alert('Échec de la soumission de l\'évaluation. Veuillez réessayer.');
          }
        );
    } else {
      console.error('Missing parameters for submitRating:', { userId: this.userId, movieId, rating });
    }
  }
}  