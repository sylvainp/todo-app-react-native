import {LoginUsecaseRequest} from '../usecasess/login/login.usecaserequest';
import {RegisterUsecaseRequest} from '../usecasess/register/register.usecaserequest';

export interface AuthPort {
  register(request: RegisterUsecaseRequest): Promise<string | Error>;
  login(request: LoginUsecaseRequest): Promise<string | Error>;
}
