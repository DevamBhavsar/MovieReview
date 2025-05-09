/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../interceptor/RequestAndResponseInterceptor";
import type { ApiRequestOptions } from "./ApiRequestOptions";

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
  BASE: string;
  VERSION: string;
  WITH_CREDENTIALS: boolean;
  CREDENTIALS: "include" | "omit" | "same-origin";
  TOKEN?: string | Resolver<string> | undefined;
  USERNAME?: string | Resolver<string> | undefined;
  PASSWORD?: string | Resolver<string> | undefined;
  HEADERS?: Headers | Resolver<Headers> | undefined;
  ENCODE_PATH?: ((path: string) => string) | undefined;
  FETCH?: (url: string, init: RequestInit) => Promise<Response>;
};

export const OpenAPI: OpenAPIConfig = {
  BASE: "http://localhost:8088/api/v1",
  VERSION: "1.0",
  WITH_CREDENTIALS: true,
  CREDENTIALS: "include",
  TOKEN: undefined,
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
  FETCH: async (url, init) => {
    const response = await axiosInstance({
      url,
      method: init.method as AxiosRequestConfig["method"],
      data: init.body,
      headers: init.headers as AxiosRequestConfig["headers"],
    });
    console.log("Axios response:", response);
    return new Response(new Blob([JSON.stringify(response.data)]), {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers(response.headers as any),
    });
  },
};
