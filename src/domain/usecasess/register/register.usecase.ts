import Usecase from '../../../core/usecase/usecase';
import UsecaseResponse from '../../../core/usecase/usecase.response';
import {AuthPort} from '../../ports/auth.port';
import {RegisterUsecaseRequest} from './register.usecaserequest';

export default class RegisterUsecase extends Usecase<
  RegisterUsecaseRequest,
  void
> {
  constructor(private readonly authPort: AuthPort) {
    super();
  }
  async call(request: RegisterUsecaseRequest): Promise<UsecaseResponse<void>> {
    const response: string | Error = await this.authPort.register(request);
    if (response instanceof Error) {
      return UsecaseResponse.fromError(response);
    }
    return UsecaseResponse.fromData(null);
  }
}
