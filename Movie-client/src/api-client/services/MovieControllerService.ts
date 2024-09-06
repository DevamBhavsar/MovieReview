/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Movies } from '../models/Movies';
import type { MovieWithReviewsDTO } from '../models/MovieWithReviewsDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MovieControllerService {
    /**
     * @param imdbId
     * @returns MovieWithReviewsDTO OK
     * @throws ApiError
     */
    public static getMovieByImdbId(
        imdbId: string,
    ): CancelablePromise<MovieWithReviewsDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/movies/{imdbId}',
            path: {
                'imdbId': imdbId,
            },
        });
    }
    /**
     * @param imdbId
     * @param requestBody
     * @returns Movies OK
     * @throws ApiError
     */
    public static updateMovie(
        imdbId: string,
        requestBody: Movies,
    ): CancelablePromise<Movies> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/movies/{imdbId}',
            path: {
                'imdbId': imdbId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns Movies OK
     * @throws ApiError
     */
    public static getAllMovies(): CancelablePromise<Array<Movies>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/movies',
        });
    }
}
