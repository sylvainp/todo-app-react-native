import UsecaseRequest from '../../../core/usecase/usecase.request';

export default interface MarkTodoDoneRequest extends UsecaseRequest {
  id: string;
  done: boolean;
}
