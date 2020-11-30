import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { TrendingComponent } from './components/trending/trending.component';

const routes: Routes = [
  { path: '', component: TrendingComponent },
  { path: 'search', component: SearchResultComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
