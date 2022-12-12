import Usecase from '../../../core/usecase/usecase';
import UsecaseResponse from '../../../core/usecase/usecase.response';
import TodoEntity from '../../entities/todo.entities';
import TodoPort from '../../ports/todo.port';
import MarkTodoDoneRequest from './mark_todo_done.usecaserequest';

export default class MarkTodoDoneUsecase extends Usecase<
  MarkTodoDoneRequest,
  TodoEntity
> {
  constructor(private repository: TodoPort) {
    super();
  }
  async call(
    request: MarkTodoDoneRequest,
  ): Promise<UsecaseResponse<TodoEntity>> {
    const response = await this.repository.markTodoDone(request);
    if (response instanceof Error) {
      return UsecaseResponse.fromError(response);
    }
    return UsecaseResponse.fromData(response);
  }
}
