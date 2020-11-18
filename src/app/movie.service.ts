import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchResult } from './search-result';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey: string;

  public constructor(private http: HttpClient) {
    this.apiKey = environment.themoviedb.apiKey;
  }

  public getResult(searchQuerry: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(
      `${environment.themoviedb.baseUrl}search/movie?api_key=${this.apiKey}&language=en-US&query=${searchQuerry}`
    );
  }
}
