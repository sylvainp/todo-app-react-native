import {autoInjectable, inject} from 'tsyringe';
import Usecase from '../../../core/usecase/usecase';
import UsecaseResponse from '../../../core/usecase/usecase.response';
import TodoEntity from '../../entities/todo.entities';
import TodoPort, {TodoPortInjectorName} from '../../ports/todo.port';

@autoInjectable()
export default class ListAllTodoUsecase extends Usecase<null, TodoEntity[]> {
  constructor(@inject(TodoPortInjectorName) private repository: TodoPort) {
    super();
  }
  async call(): Promise<UsecaseResponse<TodoEntity[]>> {
    const response = await this.repository.getAllTodo();
    if (response instanceof Error) {
      return UsecaseResponse.fromError(response);
    }
    return UsecaseResponse.fromData(response);
  }
}
