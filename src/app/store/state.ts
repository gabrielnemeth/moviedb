import { GenreState } from './genre/genre.reducer';
import { TrendingState } from './trending/trending.reducer';
import { SearchedMediaState } from './searched-media/searched-media.reducer';
import { FeaturedState } from './featured/featured.reducer';
import { PopularState } from './popular/popular.reducer';

export interface State {
    searchResult: SearchedMediaState;
    trending: TrendingState;
    popular: PopularState;
    genres: GenreState;
    featured: FeaturedState;
}
