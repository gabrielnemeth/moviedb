import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { MediaType } from 'src/app/interfaces/media-type';
import { SearchType } from 'src/app/interfaces/search-type';
import { MediaService } from '../../services/media.service';
import {
    mediaSearch,
    SEARCH_MEDIA_LOADED_SUCCESS,
    searchedMediaLoaded,
} from './searched-media.actions';
import { TypedAction } from '@ngrx/store/src/models';
import { Observable } from 'rxjs';
import { MediaListResult } from '../../interfaces/media-list-result';

@Injectable()
export class SearchedMediaEffects {
    public searchMedia$ = createEffect(() =>
        this.actions$.pipe(
            ofType(mediaSearch),
            mergeMap((action) => {
                switch (action.search_type) {
                    case SearchType.movie:
                        return this.searchMovies(action.query);

                    case SearchType.tv:
                        return this.searchTvs(action.query);

                    case SearchType.person:
                        return this.searchPerson(action.query);

                    case SearchType.multi:
                        return this.searchMulti(action.query);
                }
            })
        )
    );

    public constructor(
        private actions$: Actions,
        private mediaService: MediaService
    ) {}

    private searchMovies(
        searchQuery: string
    ): Observable<
        {
            list: MediaListResult[];
        } & TypedAction<typeof SEARCH_MEDIA_LOADED_SUCCESS>
    > {
        return this.mediaService.getMovieSearchResult(searchQuery).pipe(
            map((result) =>
                searchedMediaLoaded({
                    list: result.results.map((res) => ({
                        ...res,
                        media_type: MediaType.movie,
                    })),
                })
            )
        );
    }

    private searchTvs(
        searchQuery: string
    ): Observable<
        {
            list: MediaListResult[];
        } & TypedAction<typeof SEARCH_MEDIA_LOADED_SUCCESS>
    > {
        return this.mediaService.getTvSearchResult(searchQuery).pipe(
            map((result) =>
                searchedMediaLoaded({
                    list: result.results.map((res) => ({
                        ...res,
                        media_type: MediaType.tv,
                    })),
                })
            )
        );
    }

    private searchPerson(
        searchQuery: string
    ): Observable<
        {
            list: MediaListResult[];
        } & TypedAction<typeof SEARCH_MEDIA_LOADED_SUCCESS>
    > {
        return this.mediaService.getPersonSearchResult(searchQuery).pipe(
            map((result) =>
                searchedMediaLoaded({
                    list: result.results.map((res) => ({
                        ...res,
                        media_type: MediaType.person,
                    })),
                })
            )
        );
    }

    private searchMulti(
        searchQuery: string
    ): Observable<
        {
            list: MediaListResult[];
        } & TypedAction<typeof SEARCH_MEDIA_LOADED_SUCCESS>
    > {
        return this.mediaService.getMultiSearchResult(searchQuery).pipe(
            map((result) =>
                searchedMediaLoaded({
                    list: result.results,
                })
            )
        );
    }
}
