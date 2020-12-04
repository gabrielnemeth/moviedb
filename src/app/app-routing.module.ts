import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { TrendingComponent } from './components/trending/trending.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { TvDetailComponent } from './components/tv-detail/tv-detail.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';

const routes: Routes = [
  { path: '', component: TrendingComponent },
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
