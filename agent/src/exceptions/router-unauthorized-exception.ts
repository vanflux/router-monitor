import { RouterApiException } from "./router-api-exception";

export class RouterUnauthorizedException<T> extends RouterApiException<T> {}