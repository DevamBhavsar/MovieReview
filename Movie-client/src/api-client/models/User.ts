/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GrantedAuthority } from './GrantedAuthority';
import type { Role } from './Role';
export type User = {
    id?: string;
    username: string;
    email: string;
    enabled?: boolean;
    accountLocked?: boolean;
    createdDate: string;
    lastUpdatedDate: string;
    roles?: Array<Role>;
    authorities?: Array<GrantedAuthority>;
    accountNonExpired?: boolean;
    accountNonLocked?: boolean;
    credentialsNonExpired?: boolean;
    name?: string;
};

