import {autoInjectable, inject} from 'tsyringe';
import Usecase from '../../../core/usecase/usecase';
import UsecaseResponse from '../../../core/usecase/usecase.response';
import TodoEntity from '../../entities/todo.entities';
import TodoPort, {TodoPortInjectorName} from '../../ports/todo.port';
import CreateTodoRequest from './create_todo.usecaserequest';

@autoInjectable()
export default class CreateTodoUsecase extends Usecase<
  CreateTodoRequest,
  TodoEntity
> {
  constructor(@inject(TodoPortInjectorName) private repository: TodoPort) {
    super();
  }
  async call(request: CreateTodoRequest): Promise<UsecaseResponse<TodoEntity>> {
    const response: TodoEntity | Error = await this.repository.addTodo(request);
    if (response instanceof Error) {
      return UsecaseResponse.fromError(response);
    }

    return UsecaseResponse.fromData(response);
  }
}
