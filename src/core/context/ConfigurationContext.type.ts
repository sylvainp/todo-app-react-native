import InMemoryAdapter from '../../adapters/secondaries/in_memory.adapter';
import {AuthPort} from '../../domain/ports/auth.port';
import TodoPort from '../../domain/ports/todo.port';
import CreateTodoUsecase from '../../domain/usecasess/createTodo/create_todo.usecase';
import ListAllTodoUsecase from '../../domain/usecasess/listAllTodo/list_all_todo.usecase';
import LoginUsecase from '../../domain/usecasess/login/login.usecase';
import MarkTodoDoneUsecase from '../../domain/usecasess/markTodoDone/mark_todo_done.usecase';
import RegisterUsecase from '../../domain/usecasess/register/register.usecase';

export type ConfigurationContext = {
  // adapters
  todoPort: TodoPort;
  authPort: AuthPort;
  // usecases
  // --> todo
  createTodoUsecase: CreateTodoUsecase;
  markTodoDoneUsecase: MarkTodoDoneUsecase;
  listAllTodoUsecase: ListAllTodoUsecase;
  // --> auth
  registerUsecase: RegisterUsecase;
  loginUsecase: LoginUsecase;
};
