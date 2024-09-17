import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { HttpClientModule, HttpClient, provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { MovieFilterPipe } from './movie-filter.pipe';
import { MovieListComponent } from './movie-list/movie-list.component';
import { FilmsComponent } from './films/films.component';
import { TopRatedFilmsComponent } from './top-rated-films/top-rated-films.component';
import { PopularFilmsComponent } from './popular-films/popular-films.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './auth.service';
import { LoginModule } from './login/login.module';



// Factory function for the TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    RecommendationComponent,
    MoviedetailsComponent,
    MovieFilterPipe,
    MovieListComponent,
    FilmsComponent,
    TopRatedFilmsComponent,
    PopularFilmsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    FormsModule,
    HttpClientModule, // Include HttpClientModule in imports
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: []
,
  bootstrap: [AppComponent]
})
export class AppModule { }
