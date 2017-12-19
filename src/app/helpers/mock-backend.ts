import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ENDPOINTS } from 'app/shared/endpoints';
import {
  LOGIN,
} from './mocks';

export function mockBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
  backend.connections.subscribe((connection: MockConnection) => {
    console.log(backend.connections);
    setTimeout(() => {
      // login
      if (connection.request.url.endsWith(ENDPOINTS.login) && connection.request.method === RequestMethod.Post) {
        const params = JSON.parse(connection.request.getBody());
        const _requestKey = Object.keys(LOGIN).filter(key =>
          (JSON.stringify(LOGIN[key]['request']) === JSON.stringify(params))
        );
        if (_requestKey.length > 0) {
          const _key = _requestKey[0];
          connection.mockRespond(new Response(new ResponseOptions({
            status: LOGIN[_key]['status'],
            body: LOGIN[_key]['response'],
          })))
        }
        return;
      }
      // pass through any requests not handled above
      let realHttp = new Http(realBackend, options);
      let requestOptions = new RequestOptions({
        method: connection.request.method,
        headers: connection.request.headers,
        body: connection.request.getBody(),
        url: connection.request.url,
        withCredentials: connection.request.withCredentials,
        responseType: connection.request.responseType
      });
      realHttp.request(connection.request.url, requestOptions)
        .subscribe((response: Response) => {
              connection.mockRespond(response);
        },
        (error: any) => {
              connection.mockError(error);
        });
    }, 500);
  });

  return new Http(backend, options);
};

export let mockBackendProvider = {
  provide: Http,
  useFactory: mockBackendFactory,
  deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
