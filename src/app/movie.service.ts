import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MovieResult } from './movie-result';
import { Genre } from './store/genre/genre';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey: string;

  public constructor(private http: HttpClient) {
    this.apiKey = environment.themoviedb.apiKey;
  }

  public getResult(searchQuerry: string): Observable<MovieResult> {
    return this.http.get<MovieResult>(
      `${environment.themoviedb.baseUrl}search/movie?api_key=${this.apiKey}&language=en-US&query=${searchQuerry}`
    );
  }

  public getGenres(): Observable<Genre[]> {
    return this.http
      .get<{ genres: Genre[] }>(
        `${environment.themoviedb.baseUrl}genre/movie/list?api_key=${this.apiKey}&language=en-US`
      )
      .pipe(map((data) => data.genres));
  }

  public getTrending(): Observable<MovieResult> {
    return this.http.get<MovieResult>(
      `${environment.themoviedb.baseUrl}trending/movie/day?api_key=${this.apiKey}`
    );
  }
}
