import UsecaseRequest from '../../../core/usecase/usecase.request';

export default interface CreateTodoRequest extends UsecaseRequest {
  title: string;
  description: string | null;
}
