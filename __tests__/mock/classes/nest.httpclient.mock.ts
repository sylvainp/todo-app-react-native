import {NestServerHttpClient} from '../../../src/adapters/secondaries/nestServer/nest.httpclient';

export class NestServerHttpClientMock extends NestServerHttpClient {
  get<T>(route: string): Promise<T> {
    return Promise.resolve('' as T);
  }

  post<T>(route: string, body: any): Promise<T> {
    return Promise.resolve('' as T);
  }
}
