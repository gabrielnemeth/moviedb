import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Genre } from '../interfaces/genre';
import { Movie } from '../interfaces/movie';
import { MovieSearchResponse } from '../interfaces/response/movie-search-response';
import { MultiSearchResponse } from '../interfaces/response/multi-search-response';
import { PersonSearchResponse } from '../interfaces/response/person-search-response';
import { TvSearchResponse } from '../interfaces/response/tv-search-response';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private apiKey: string;

  public constructor(private http: HttpClient) {
    this.apiKey = environment.themoviedb.apiKey;
  }

  public getMovieSearchResult(
    searchQuerry: string
  ): Observable<MovieSearchResponse> {
    return this.http.get<MovieSearchResponse>(
      `${environment.themoviedb.baseUrl}search/movie?api_key=${this.apiKey}&language=en-US&query=${searchQuerry}`
    );
  }

  public getTvSearchResult(searchQuerry: string): Observable<TvSearchResponse> {
    return this.http.get<TvSearchResponse>(
      `${environment.themoviedb.baseUrl}search/tv?api_key=${this.apiKey}&language=en-US&query=${searchQuerry}`
    );
  }

  public getPersonSearchResult(
    searchQuerry: string
  ): Observable<PersonSearchResponse> {
    return this.http.get<PersonSearchResponse>(
      `${environment.themoviedb.baseUrl}search/person?api_key=${this.apiKey}&language=en-US&query=${searchQuerry}`
    );
  }

  public getMultiSearchResult(
    searchQuerry: string
  ): Observable<MultiSearchResponse> {
    return this.http.get<MultiSearchResponse>(
      `${environment.themoviedb.baseUrl}search/multi?api_key=${this.apiKey}&language=en-US&query=${searchQuerry}`
    );
  }

  public getGenres(): Observable<Genre[]> {
    return this.http
      .get<{ genres: Genre[] }>(
        `${environment.themoviedb.baseUrl}genre/movie/list?api_key=${this.apiKey}&language=en-US`
      )
      .pipe(map((data) => data.genres));
  }

  public getTrending(): Observable<MovieSearchResponse> {
    return this.http.get<MovieSearchResponse>(
      `${environment.themoviedb.baseUrl}trending/movie/day?api_key=${this.apiKey}`
    );
  }

  public getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(
      `${environment.themoviedb.baseUrl}movie/${id}?api_key=${this.apiKey}&language=en-US`
    );
  }
}
