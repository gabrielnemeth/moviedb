import { Episode } from './episode';
import { Credits } from './credits';

export interface SeasonDetail {
    _id: string;
    air_date: string;
    episodes: Episode[];
    credits?: Credits;
    name: string;
    overview: string;
    id: number;
    poster_path: string;
    season_number: number;
}
