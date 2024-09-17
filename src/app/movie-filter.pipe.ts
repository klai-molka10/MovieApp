import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {
 
  transform(movies: any[], movieName: string): any[] {
    console.log('Movies:', movies);
    console.log('Search Text:', movieName);
    if (!movies || !movieName) {
      return movies;
    }
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(movieName.toLowerCase())
    );
  }
}