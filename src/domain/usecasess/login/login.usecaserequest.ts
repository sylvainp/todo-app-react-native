import UsecaseRequest from '../../../core/usecase/usecase.request';

export interface LoginUsecaseRequest extends UsecaseRequest {
  username: string;
  password: string;
}
