import {AuthPort} from '../../../domain/ports/auth.port';
import {LoginUsecaseRequest} from '../../../domain/usecasess/login/login.usecaserequest';
import {RegisterUsecaseRequest} from '../../../domain/usecasess/register/register.usecaserequest';
import {NestServerHttpClient} from './nest.httpclient';

export default class AuthNestServerAdapter implements AuthPort {
  constructor(private readonly httpClient: NestServerHttpClient) {}

  async login(request: LoginUsecaseRequest): Promise<string | Error> {
    const response = await this.httpClient.post('auth/login', request);
    if (response.statusCode >= 400) {
      return new Error(response.message);
    }
    return response.data.access_token;
  }

  async register(request: RegisterUsecaseRequest): Promise<string | Error> {
    // throw new Error('Method not implemented.');
    try {
      const response: any = await this.httpClient.post(
        'auth/register',
        request,
      );
      console.log('AuthNestServerAdapter.register', JSON.stringify(response));
      if (response.statusCode == 200) {
        return response;
      } else if (response.statusCode == 409) {
        return new Error('User already registered. Please login');
      } else {
        return new Error(JSON.stringify(response));
      }
    } catch (error) {
      console.log('AuthNestServerAdapter.register', JSON.stringify(error));
      return new Error('Unable to create account');
    }
  }
}
