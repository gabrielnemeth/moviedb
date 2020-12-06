export interface Video {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: 360 | 480 | 720 | 1080;
    type:
        | 'Trailer'
        | 'Teaser'
        | 'Clip'
        | 'Featurette'
        | 'Opening Credits'
        | 'Behind the Scenes'
        | 'Bloopers';
}
