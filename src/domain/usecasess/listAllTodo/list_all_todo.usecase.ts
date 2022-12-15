import Usecase from '../../../core/usecase/usecase';
import UsecaseResponse from '../../../core/usecase/usecase.response';
import TodoEntity from '../../entities/todo.entities';
import TodoPort from '../../ports/todo.port';

export default class ListAllTodoUsecase extends Usecase<null, TodoEntity[]> {
  constructor(private repository: TodoPort) {
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
