import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { GenreEffects } from './store/genre/genre.effects';
import * as genreReducer from './store/genre/genre.reducer';
import { MovieEffects } from './store/movie/movie.effects';
import * as movieReducer from './store/movie/movie.reducer';
import { TrendingEffects } from './store/trending/trending.effects';
import * as trendingReducer from './store/trending/trending.reducer';
import { SearchComponent } from './search/search.component';
import { TrendingComponent } from './trending/trending.component';

@NgModule({
  declarations: [AppComponent, MovieCardComponent, MovieListComponent, SearchComponent, TrendingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      movies: movieReducer.reducer,
      trending: trendingReducer.reducer,
      genres: genreReducer.reducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([MovieEffects, TrendingEffects, GenreEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
