/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Reviews } from '../models/Reviews';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReviewControllerService {
    /**
     * @param requestBody
     * @returns Reviews OK
     * @throws ApiError
     */
    public static createReview(
        requestBody: Reviews,
    ): CancelablePromise<Reviews> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/reviews',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
