/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReviewDTO } from './ReviewDTO';
export type MovieWithReviewsDTO = {
    imdbId?: string;
    title?: string;
    releaseDate?: string;
    trailerLink?: string;
    poster?: string;
    genres?: Array<string>;
    backdrops?: Array<string>;
    reviews?: Array<ReviewDTO>;
};

