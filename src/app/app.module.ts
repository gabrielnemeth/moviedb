import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MediaItemCardComponent } from './components/media/media-item-card/media-item-card.component';
import { MediaItemDetailComponent } from './components/media/media-item-detail/media-item-detail.component';
import { MediaItemImageComponent } from './components/media/media-item-image/media-item-image.component';
import { MediaItemListComponent } from './components/media/media-item-list/media-item-list.component';
import { MediaItemPlaceholderImageComponent } from './components/media/media-item-placeholder-image/media-item-placeholder-image.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SlidingItemsComponent } from './components/sliding-items/sliding-items.component';
import { TrendingComponent } from './components/trending/trending.component';
import { GenreEffects } from './store/genre/genre.effects';
import * as genreReducer from './store/genre/genre.reducer';
import { MovieEffects } from './store/movie/movie.effects';
import { SearchedMediaEffects } from './store/searched-media/searched-media.effects';
import * as searchedMediaReducer from './store/searched-media/searched-media.reducer';
import { TrendingEffects } from './store/trending/trending.effects';
import * as trendingReducer from './store/trending/trending.reducer';
import { MovieCardComponent } from './components/media/media-item-card/movie-item-card/movie-card.component';
import { TvCardComponent } from './components/media/media-item-card/tv-item-card/tv-card.component';
import { PersonCardComponent } from './components/media/media-item-card/person-item-card/person-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MediaItemCardComponent,
    MediaItemListComponent,
    SearchFormComponent,
    SearchResultComponent,
    TrendingComponent,
    MediaItemDetailComponent,
    MediaItemImageComponent,
    MediaItemPlaceholderImageComponent,
    SlidingItemsComponent,
    MovieCardComponent,
    TvCardComponent,
    PersonCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SwiperModule,
    StoreModule.forRoot({
      searchResult: searchedMediaReducer.reducer,
      trending: trendingReducer.reducer,
      genres: genreReducer.reducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      MovieEffects,
      TrendingEffects,
      GenreEffects,
      SearchedMediaEffects,
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
