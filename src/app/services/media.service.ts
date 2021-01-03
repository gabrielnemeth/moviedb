import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Genre } from '../interfaces/genre';
import { Movie } from '../interfaces/movie';
import { MovieSearchResponse } from '../interfaces/response/movie-search-response';
import { MultiSearchResponse } from '../interfaces/response/multi-search-response';
import { PersonSearchResponse } from '../interfaces/response/person-search-response';
import { TvSearchResponse } from '../interfaces/response/tv-search-response';
import { Season, Tv } from '../interfaces/tv';
import { Person } from '../interfaces/person';
import { MediaType } from '../interfaces/media-type';
import { VideoResponse } from '../interfaces/response/video-response';
import { MediaListItem } from '../interfaces/media-list-item';
import { MovieListResponse } from '../interfaces/response/movie-list-response';
import { TvListResponse } from '../interfaces/response/tv-list-response';
import { PersonListResponse } from '../interfaces/response/person-list-response';
import { Store } from '@ngrx/store';
import { State } from '../store/state';
import { selectTimeWindow } from '../store/trending/trending.reducer';
import { MediaItem } from '../interfaces/media-item';
import { flattenDeep, isNil, take, uniqBy } from 'lodash-es';
import { Video } from '../interfaces/video';
import { Credits } from '../interfaces/credits';
import { Cast } from '../interfaces/cast';
import { SeasonDetail } from '../interfaces/season-detail';
import { Review } from '../interfaces/review';

@Injectable({
    providedIn: 'root',
})
export class MediaService {
    private readonly apiKey: string;

    public constructor(private http: HttpClient, private store: Store<State>) {
        this.apiKey = environment.themoviedb.apiKey;
    }

    public getMovieSearchResult(
        searchQuery: string
    ): Observable<MediaListItem[]> {
        return this.http
            .get<MovieSearchResponse>(
                `${environment.themoviedb.baseUrl}search/movie?api_key=${this.apiKey}&language=en-US&query=${searchQuery}`
            )
            .pipe(map((movies) => this.createMediaListItemsFromMovies(movies)));
    }

    public getTvSearchResult(searchQuery: string): Observable<MediaListItem[]> {
        return this.http
            .get<TvSearchResponse>(
                `${environment.themoviedb.baseUrl}search/tv?api_key=${this.apiKey}&language=en-US&query=${searchQuery}`
            )
            .pipe(map((tvs) => this.createMediaListItemsFromTvs(tvs)));
    }

    public getPersonSearchResult(
        searchQuery: string
    ): Observable<MediaListItem[]> {
        return this.http
            .get<PersonSearchResponse>(
                `${environment.themoviedb.baseUrl}search/person?api_key=${this.apiKey}&language=en-US&query=${searchQuery}`
            )
            .pipe(map((people) => this.createMediaListItemsFromPeople(people)));
    }

    public getMultiSearchResult(
        searchQuery: string
    ): Observable<MediaListItem[]> {
        return this.http
            .get<MultiSearchResponse>(
                `${environment.themoviedb.baseUrl}search/multi?api_key=${this.apiKey}&language=en-US&query=${searchQuery}`
            )
            .pipe(map((multi) => this.createMediaListItemsFromMulti(multi)));
    }

    public getGenres(): Observable<{ movie: Genre[]; tv: Genre[] }> {
        return zip(
            this.http.get<{ genres: Genre[] }>(
                `${environment.themoviedb.baseUrl}genre/movie/list?api_key=${this.apiKey}&language=en-US`
            ),
            this.http.get<{ genres: Genre[] }>(
                `${environment.themoviedb.baseUrl}genre/tv/list?api_key=${this.apiKey}&language=en-US`
            )
        ).pipe(map(([movie, tv]) => ({ movie: movie.genres, tv: tv.genres })));
    }

    public getFeaturedMedia(): Observable<MediaListItem[]> {
        // Since the web service doesnt have featured media, we just use the trending one.
        return zip(this.getTrendingMovies(), this.getTrendingTvs()).pipe(
            map(([movie, tv]) => [...movie, ...tv])
        );
    }

    public getTrendingMediaForCurrentTimeWindow(): Observable<MediaListItem[]> {
        return this.store
            .select(selectTimeWindow)
            .pipe(
                switchMap((timeWindow) =>
                    zip(
                        this.getTrendingMovies(timeWindow),
                        this.getTrendingTvs(timeWindow)
                    ).pipe(map(([movie, tv]) => [...movie, ...tv]))
                )
            );
    }

    public getTrendingMovies(
        timeWindow: 'day' | 'week' = 'week'
    ): Observable<MediaListItem[]> {
        return this.http
            .get<MovieSearchResponse>(
                `${environment.themoviedb.baseUrl}trending/movie/${timeWindow}?api_key=${this.apiKey}`
            )
            .pipe(map((movies) => this.createMediaListItemsFromMovies(movies)));
    }

    public getTrendingTvs(
        timeWindow: 'day' | 'week' = 'week'
    ): Observable<MediaListItem[]> {
        return this.http
            .get<TvSearchResponse>(
                `${environment.themoviedb.baseUrl}trending/tv/${timeWindow}?api_key=${this.apiKey}`
            )
            .pipe(map((tvs) => this.createMediaListItemsFromTvs(tvs)));
    }

    public getMovieById(id: string): Observable<MediaItem> {
        return this.http
            .get<Movie>(
                `${environment.themoviedb.baseUrl}movie/${id}?api_key=${this.apiKey}&language=en-US&append_to_response=videos,credits,reviews`
            )
            .pipe(map((movie) => this.createMovieItem(movie)));
    }

    public getTvById(id: string): Observable<MediaItem> {
        return this.http
            .get<Tv>(
                `${environment.themoviedb.baseUrl}tv/${id}?api_key=${this.apiKey}&language=en-US&append_to_response=videos,credits,reviews`
            )
            .pipe(
                switchMap((tv) =>
                    this.getCreditsForSeasons(id, tv.seasons).pipe(
                        map((cast) => ({ tv, cast }))
                    )
                ),
                map((data) => this.createTvItem(data))
            );
    }

    private getCreditsForSeasons(
        id: string,
        season: Season[]
    ): Observable<Cast[]> {
        const seasonNumbers = season.map((s) => s.season_number);
        const credits$ = seasonNumbers.map((seasonNumber) =>
            this.http.get<SeasonDetail>(
                `${environment.themoviedb.baseUrl}tv/${id}/season/${seasonNumber}?api_key=${this.apiKey}&language=en-US&append_to_response=credits`
            )
        );

        return zip(...credits$).pipe(
            map((seasons) => this.getCastFromSeasons(seasons))
        );
    }

    private getCastFromSeasons(seasonData: SeasonDetail[]): Cast[] {
        const seasonsWithCast = seasonData
            .filter((s) => !isNil(s.credits))
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .filter((s) => s.credits!.cast.length > 0);
        const cast = seasonsWithCast.map((s) =>
            s.credits?.cast.map((c) => ({
                id: c.id,
                name: c.name,
                characterName: c.character,
                imagePath: c.profile_path,
            }))
        );
        const flattenedCast = flattenDeep(cast);
        const uniqCast = uniqBy(flattenedCast, 'id');

        const seasonsWithGuestStars = seasonData
            .filter(
                (s) =>
                    s.episodes.filter((e) => e.guest_stars.length > 0).length >
                    0
            )
            .map((s) =>
                s.episodes.map((e) =>
                    e.guest_stars.map((gs) => ({
                        id: gs.id,
                        name: gs.name,
                        characterName: gs.character,
                        imagePath: gs.profile_path,
                    }))
                )
            );

        const flattenedGuestStars = flattenDeep(seasonsWithGuestStars);
        const uniqGuestStars = uniqBy(flattenedGuestStars, 'id');

        return uniqBy([...uniqCast, ...uniqGuestStars], 'id') as Cast[];
    }

    public getPersonById(id: string): Observable<MediaItem> {
        return this.http
            .get<Person>(
                `${environment.themoviedb.baseUrl}person/${id}?api_key=${this.apiKey}&language=en-US`
            )
            .pipe(map((person) => this.createPersonItem(person)));
    }

    public getVideo(
        id: number,
        mediaType: MediaType
    ): Observable<VideoResponse> {
        console.assert(
            mediaType === MediaType.movie || mediaType === MediaType.tv,
            'Wrong media type was provided'
        );
        const type = mediaType === MediaType.movie ? 'movie' : 'tv';
        const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${this.apiKey}&language=en-US`;
        return this.http.get<VideoResponse>(url);
    }

    private createMediaListItemsFromMovies(
        movieSearchResponse: MovieSearchResponse
    ): MediaListItem[] {
        return movieSearchResponse.results.map((movie) =>
            this.createMovieListItem(movie)
        );
    }

    private createMovieListItem(movie: MovieListResponse): MediaListItem {
        return {
            id: movie.id,
            title: movie.title,
            genresIds: movie.genre_ids,
            img: {
                poster: movie.poster_path,
                backdrop: movie.backdrop_path,
            },
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average,
            popularity: movie.popularity,
            type: MediaType.movie,
        };
    }

    private createMovieItem(movie: Movie): MediaItem {
        return {
            id: movie.id,
            title: movie.title,
            genres: take(
                movie.genres.map((genre) => genre.name),
                2
            ),
            img: {
                poster: movie.poster_path,
                backdrop: movie.backdrop_path,
            },
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average,
            popularity: movie.popularity,
            overview: movie.overview,
            reviews:
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                movie.reviews!.results.length > 0
                    ? this.validateAvatarImages(
                          movie.reviews?.results as Review[]
                      )
                    : undefined,
            runtime: movie.runtime,
            trailerVideoId: this.getTrailerVideoId(movie?.videos?.results),
            cast: this.createCastFromCredit(movie?.credits),
            type: MediaType.movie,
        };
    }

    private createMediaListItemsFromTvs(
        tvSearchResponse: TvSearchResponse
    ): MediaListItem[] {
        return tvSearchResponse.results.map((tv) => this.createTvListItem(tv));
    }

    private createTvListItem(tv: TvListResponse): MediaListItem {
        return {
            id: tv.id,
            title: tv.name,
            genresIds: tv.genre_ids,
            img: {
                poster: tv.poster_path,
                backdrop: tv.backdrop_path,
            },
            releaseDate: tv.first_air_date,
            voteAverage: tv.vote_average,
            popularity: tv.popularity,
            type: MediaType.tv,
        };
    }

    private createTvItem(data: { tv: Tv; cast: Cast[] }): MediaItem {
        return {
            id: data.tv.id,
            title: data.tv.name,
            genres: take(
                data.tv.genres.map((genre) => genre.name),
                2
            ),
            img: {
                poster: data.tv.poster_path,
                backdrop: data.tv.backdrop_path,
            },
            releaseDate: data.tv.first_air_date,
            voteAverage: data.tv.vote_average,
            popularity: data.tv.popularity,
            overview: data.tv.overview,
            reviews:
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                data.tv.reviews!.results.length > 0
                    ? this.validateAvatarImages(
                          data.tv.reviews?.results as Review[]
                      )
                    : undefined,
            trailerVideoId: this.getTrailerVideoId(data.tv?.videos?.results),
            cast: data.cast,
            type: MediaType.tv,
        };
    }

    private createMediaListItemsFromPeople(
        personSearchResponse: PersonSearchResponse
    ): MediaListItem[] {
        return personSearchResponse.results.map((person) =>
            this.createPersonListItem(person)
        );
    }

    private createPersonListItem(person: PersonListResponse): MediaListItem {
        return {
            id: person.id,
            title: person.name,
            img: {
                poster: person.profile_path,
            },
            popularity: person.popularity,
            type: MediaType.person,
        };
    }

    private createPersonItem(person: Person): MediaItem {
        return {
            id: person.id,
            title: person.name,
            img: {
                poster: person.profile_path,
            },
            popularity: person.popularity,
            type: MediaType.tv,
        };
    }

    private createMediaListItemsFromMulti(
        multiSearchResponse: MultiSearchResponse
    ): MediaListItem[] {
        return multiSearchResponse.results.map((multi) => {
            if (multi.media_type === MediaType.movie) {
                return this.createMovieListItem(multi as MovieListResponse);
            }

            if (multi.media_type === MediaType.tv) {
                return this.createTvListItem(multi as TvListResponse);
            }

            if (multi.media_type === MediaType.person) {
                return this.createPersonListItem(multi as PersonListResponse);
            }

            throw new TypeError(`MediaListItem can't be undefined.`);
        });
    }

    private getTrailerVideoId(videos: Video[] | undefined): string | undefined {
        if (isNil(videos)) {
            return videos;
        }

        const trailerVideo = videos.find((video) => video.type === 'Trailer');
        const teaserVideo = videos.find((video) => video.type === 'Teaser');

        if (isNil(trailerVideo) && isNil(teaserVideo)) {
            return undefined;
        }

        const videoToReturn = isNil(trailerVideo) ? teaserVideo : trailerVideo;

        return videoToReturn?.key;
    }

    private createCastFromCredit(
        credits: Credits | undefined
    ): Cast[] | undefined {
        return credits?.cast.map(
            (c) =>
                ({
                    id: c.id,
                    name: c.name,
                    characterName: c.character,
                    imagePath: c.profile_path,
                } as Cast)
        );
    }

    private getValidImagePath(
        imagePath: string | undefined
    ): string | undefined {
        if (isNil(imagePath)) {
            return imagePath;
        }
        const baseUrl = 'https://image.tmdb.org/t/p/w185';
        const isValid = this.isValidHttpUrl(imagePath);
        // / char is appended even for valid urls.
        return isValid ? this.fixedUrl(imagePath) : `${baseUrl}${imagePath}`;
    }

    private fixedUrl(url: string): string {
        // The service may append a / char at the beginning of the valid URL.
        return url.charAt(0) === '/' ? url.substring(1) : url;
    }

    private isValidHttpUrl(urlToValidate: string): boolean {
        let url;
        try {
            url = new URL(this.fixedUrl(urlToValidate));
        } catch (_) {
            return false;
        }

        return url.protocol === 'http:' || url.protocol === 'https:';
    }

    private validateAvatarImages(reviews: Review[]): Review[] {
        return reviews.map((review) => ({
            ...review,
            author_details: {
                ...review.author_details,
                avatar_path: this.getValidImagePath(
                    review.author_details.avatar_path
                ),
            },
        }));
    }
}
