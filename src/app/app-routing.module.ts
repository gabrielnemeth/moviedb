import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MovieDetailComponent } from './components/media/media-detail/movie-detail/movie-detail.component';
import { TvDetailComponent } from './components/media/media-detail/tv-detail/tv-detail.component';
import { PersonDetailComponent } from './components/media/media-detail/person-detail/person-detail.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'search', component: SearchResultComponent },
    { path: 'movie/:id', component: MovieDetailComponent },
    { path: 'tv/:id', component: TvDetailComponent },
    { path: 'person/:id', component: PersonDetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
