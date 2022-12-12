import TodoEntity from '../entities/todo.entities';
import CreateTodoRequest from '../usecasess/createTodo/create_todo.usecaserequest';
import MarkTodoDoneRequest from '../usecasess/markTodoDone/mark_todo_done.usecaserequest';

export default interface TodoPort {
  addTodo(request: CreateTodoRequest): Promise<TodoEntity | Error>;
  getAllTodo(): Promise<TodoEntity[] | Error>;
  markTodoDone(request: MarkTodoDoneRequest): Promise<TodoEntity | Error>;
}
