import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { monitorEventLoopDelay } from 'perf_hooks';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import path from 'path';
import { MovieListComponent } from './movie-list/movie-list.component';
import { FilmsComponent } from './films/films.component';
import { TopRatedFilmsComponent } from './top-rated-films/top-rated-films.component';
import { PopularFilmsComponent } from './popular-films/popular-films.component';
import { AuthGuard } from './auth-guard.service';



const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
{path:"signup", component:SignupComponent},
{path:"recommendation",component:RecommendationComponent},
{path:"movies/:id", component:MoviedetailsComponent},
{path:"movies", component:MovieListComponent},
{path:"films", component:FilmsComponent},
  { path: 'films/top-rated', component: TopRatedFilmsComponent },
  { path: 'films/popular', component:PopularFilmsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
