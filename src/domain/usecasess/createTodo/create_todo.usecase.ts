import {EventSubscriptionVendor} from 'react-native';
import {autoInjectable, inject} from 'tsyringe';
import Usecase from '../../../core/usecase';
import UsecaseResponse from '../../../core/usecase.response';
import TodoEntity from '../../entities/todo.entities';
import TodoRepository, {
  TodoRepositoryInjectorName,
} from '../../repositories/todo.repository';
import CreateTodoRequest from './create_todo.usecaserequest';

@autoInjectable()
export default class CreateTodoUsecase extends Usecase<
  CreateTodoRequest,
  TodoEntity
> {
  constructor(
    @inject(TodoRepositoryInjectorName) private repository: TodoRepository,
  ) {
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
