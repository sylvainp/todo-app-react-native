import {AuthPort} from '../../../src/domain/ports/auth.port';
import {LoginUsecaseRequest} from '../../../src/domain/usecasess/login/login.usecaserequest';
import {RegisterUsecaseRequest} from '../../../src/domain/usecasess/register/register.usecaserequest';

export default class AuthPortMock implements AuthPort {
  login(request: LoginUsecaseRequest): Promise<string | Error> {
    return Promise.resolve('');
  }
  register(request: RegisterUsecaseRequest): Promise<string | Error> {
    return Promise.resolve('');
  }
}
