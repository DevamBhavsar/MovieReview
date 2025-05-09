/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectId } from './ObjectId';
import type { Reviews } from './Reviews';
export type Movies = {
    id?: ObjectId;
    imdbId: string;
    title: string;
    releaseDate?: string;
    trailerLink?: string;
    poster?: string;
    genres?: Array<string>;
    backdrops?: Array<string>;
    reviewIds?: Array<Reviews>;
};

