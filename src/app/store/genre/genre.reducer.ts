import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { Genre } from '../../interfaces/genre';
import { State } from '../state';
import { genresLoaded } from './genre.actions';
import { MediaType } from '../../interfaces/media-type';

export interface GenreState {
    movie: Genre[];
    tv: Genre[];
}

const initialState: GenreState = {
    movie: [],
    tv: [],
};

const _genreReducer = createReducer(
    initialState,
    on(genresLoaded, (state, data) => ({ movie: data.movie, tv: data.tv }))
);

export function reducer(
    state: GenreState | undefined,
    action: Action
): GenreState {
    return _genreReducer(state, action);
}

export const selectGenres = (state: State): GenreState => state.genres;

export const getGenreById = createSelector(
    selectGenres,
    (genreState: GenreState, props: { id: number; mediaType: MediaType }) => {
        if (props.mediaType === MediaType.movie) {
            return genreState.movie?.find((g) => g.id === props.id);
        }

        if (props.mediaType === MediaType.tv) {
            return genreState.tv?.find((g) => g.id === props.id);
        }

        throw new TypeError('Media must be type movie or tv');
    }
);

export const getGenresByIds = createSelector(
    selectGenres,
    (
        genreState: GenreState,
        props: { ids: number[]; mediaType: MediaType }
    ) => {
        if (props.mediaType === MediaType.movie) {
            return props.ids.map((id) =>
                genreState.movie.find((genre) => genre.id === id)
            );
        }

        if (props.mediaType === MediaType.tv) {
            return props.ids.map((id) =>
                genreState.tv.find((genre) => genre.id === id)
            );
        }
        throw new TypeError('Media must be type movie or tv');
    }
);
