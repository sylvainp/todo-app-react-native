import {autoInjectable, inject} from 'tsyringe';
import Usecase from '../../../core/usecase/usecase';
import UsecaseResponse from '../../../core/usecase/usecase.response';
import TodoEntity from '../../entities/todo.entities';
import TodoPort, {TodoPortInjectorName} from '../../ports/todo.port';
import MarkTodoDoneRequest from './mark_todo_done.usecaserequest';

@autoInjectable()
export default class MarkTodoDoneUsecase extends Usecase<
  MarkTodoDoneRequest,
  TodoEntity
> {
  constructor(@inject(TodoPortInjectorName) private repository: TodoPort) {
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
