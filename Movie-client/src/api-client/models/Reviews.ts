/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Movies } from './Movies';
import type { User } from './User';
export type Reviews = {
    id?: string;
    createdDate?: string;
    lastModifiedDate?: string;
    createdBy?: string;
    lastModifiedBy?: string;
    body: string;
    movie?: Movies;
    user?: User;
};

