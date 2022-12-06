import Usecase from '../../../core/usecase';
import UsecaseResponse from '../../../core/usecase.response';
import TodoEntity from '../../entities/todo.entities';

export default class ListAllTodoUsecase extends Usecase<null, TodoEntity[]> {
  call(request: null): Promise<UsecaseResponse<TodoEntity[]>> {
    
  }
}
