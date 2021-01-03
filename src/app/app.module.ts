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
import * as featuredReducer from './store/featured/featured.reducer';
import { MovieDetailComponent } from './components/media/media-detail/movie-detail/movie-detail.component';
import { TvDetailComponent } from './components/media/media-detail/tv-detail/tv-detail.component';
import { PersonDetailComponent } from './components/media/media-detail/person-detail/person-detail.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { VimeModule } from '@vime/angular';
import { MediaTypeSwitchComponent } from './components/media-type-switch/media-type-switch.component';
import { TimeSwitchComponent } from './components/time-switch/time-switch.component';
import { MediaDetailComponent } from './components/media/media-detail/media-detail.component';
import { ReviewContentComponent } from './components/media/media-detail/review-content/review-content.component';
import { RatingBadgeComponent } from './components/media/media-detail/review-badge/rating-badge.component';
import { ReviewComponent } from './components/media/media-detail/review/review.component';
import { FeaturedEffects } from './store/featured/featured.effects';
import { FactsComponent } from './components/media/media-detail/facts/facts.component';

@NgModule({
    declarations: [
        AppComponent,
        MediaItemCardComponent,
        MediaItemListComponent,
        SearchFormComponent,
        SearchResultComponent,
        TrendingComponent,
        MediaItemImageComponent,
        MediaItemPlaceholderImageComponent,
        SlidingItemsComponent,
        MovieDetailComponent,
        TvDetailComponent,
        PersonDetailComponent,
        HeaderBarComponent,
        HomePageComponent,
        VideoPlayerComponent,
        MediaTypeSwitchComponent,
        TimeSwitchComponent,
        MediaDetailComponent,
        ReviewContentComponent,
        RatingBadgeComponent,
        ReviewComponent,
        FactsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        SwiperModule,
        VimeModule,
        StoreModule.forRoot({
            searchResult: searchedMediaReducer.reducer,
            trending: trendingReducer.reducer,
            genres: genreReducer.reducer,
            featured: featuredReducer.reducer,
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
            FeaturedEffects,
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
