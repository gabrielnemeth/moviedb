import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaItemDetailComponent } from './components/media/media-item-detail/media-item-detail.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { TrendingComponent } from './components/trending/trending.component';

const routes: Routes = [
  { path: '', component: TrendingComponent },
  { path: 'search', component: SearchResultComponent },
  { path: 'movie/:id', component: MediaItemDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
