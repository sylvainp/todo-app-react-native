import UsecaseRequest from '../../../core/usecase/usecase.request';

export interface RegisterUsecaseRequest extends UsecaseRequest {
  email: string;
  familyName: string;
  givenName: string;
  password: string;
}
