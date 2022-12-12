import InMemoryAdapter from '../../data/adapters/in_memory.adapter';
import TodoPort from '../../domain/ports/todo.port';
import CreateTodoUsecase from '../../domain/usecasess/createTodo/create_todo.usecase';
import ListAllTodoUsecase from '../../domain/usecasess/listAllTodo/list_all_todo.usecase';
import MarkTodoDoneUsecase from '../../domain/usecasess/markTodoDone/mark_todo_done.usecase';

export type ConfigurationContext = {
  // adapters
  inMemoryAdapter: InMemoryAdapter;
  // ports
  todoPort: TodoPort;
  // usecases
  createTodoUsecase: CreateTodoUsecase;
  markTodoDoneUsecase: MarkTodoDoneUsecase;
  listAllTodoUsecase: ListAllTodoUsecase;
};
