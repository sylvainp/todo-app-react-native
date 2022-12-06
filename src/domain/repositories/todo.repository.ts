import TodoEntity from '../entities/todo.entities';
import CreateTodoRequest from '../usecasess/create_todo.usecaserequest';

export const TodoRepositoryInjectorName = 'TodoRepository';
export default interface TodoRepository {
  addTodo(request: CreateTodoRequest): Promise<TodoEntity | Error>;
}
