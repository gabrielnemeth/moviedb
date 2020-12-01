import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailComponent } from './components/item/item-detail/item-detail.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { TrendingComponent } from './components/trending/trending.component';

const routes: Routes = [
  { path: '', component: TrendingComponent },
  { path: 'search', component: SearchResultComponent },
  { path: 'movie/:id', component: ItemDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
