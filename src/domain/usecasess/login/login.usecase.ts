import Usecase from '../../../core/usecase/usecase';
import UsecaseResponse from '../../../core/usecase/usecase.response';
import {AuthPort} from '../../ports/auth.port';
import {LoginUsecaseRequest} from './login.usecaserequest';

export default class LoginUsecase extends Usecase<LoginUsecaseRequest, string> {
  constructor(private readonly authPort: AuthPort) {
    super();
  }
  async call(request: LoginUsecaseRequest): Promise<UsecaseResponse<string>> {
    const response: string | Error = await this.authPort.login(request);
    if (response instanceof Error) {
      return UsecaseResponse.fromError(response);
    }
    return UsecaseResponse.fromData(response);
  }
}
