import request, { CoreOptions, Request, RequestAPI, RequiredUriUrl } from "request";

export type HttpClient = RequestAPI<Request, CoreOptions, RequiredUriUrl>;

export function createHttpClient(options: CoreOptions) {
	return request.defaults(options);
}
