import { GenreState } from './genre/genre.reducer';
import { TrendingState } from './trending/trending.reducer';
import { SearchedMediaState } from './searched-media/searched-media.reducer';

export interface State {
    searchResult: SearchedMediaState;
    trending: TrendingState;
    genres: GenreState;
}
