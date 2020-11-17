import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from './search-result';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  public constructor(private http: HttpClient) {}

  public getResult(searchQuerry: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(
      `https://api.themoviedb.org/3/search/movie?api_key=<API_KEY>&language=en-US&query=${searchQuerry}`
    );
  }
}
