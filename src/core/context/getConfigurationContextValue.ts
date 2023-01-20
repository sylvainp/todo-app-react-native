import InMemoryAdapter from '../../adapters/secondaries/in_memory.adapter';
import AuthNestServerAdapter from '../../adapters/secondaries/nestServer/auth.nest.adapter';
import {NestServerHttpClient} from '../../adapters/secondaries/nestServer/nest.httpclient';
import {TodosNestServerAdapter} from '../../adapters/secondaries/nestServer/todos.nest.adapter';
import {AuthPort} from '../../domain/ports/auth.port';
import TodoPort from '../../domain/ports/todo.port';
import CreateTodoUsecase from '../../domain/usecasess/createTodo/create_todo.usecase';
import ListAllTodoUsecase from '../../domain/usecasess/listAllTodo/list_all_todo.usecase';
import LoginUsecase from '../../domain/usecasess/login/login.usecase';
import MarkTodoDoneUsecase from '../../domain/usecasess/markTodoDone/mark_todo_done.usecase';
import RegisterUsecase from '../../domain/usecasess/register/register.usecase';
import {ConfigurationContext} from './ConfigurationContext.type';

const getConfigurationContextValue = (
  authToken: string | null,
): ConfigurationContext => {
  // adapters
  const httpClient: NestServerHttpClient = new NestServerHttpClient(authToken);
  const authPort: AuthPort = new AuthNestServerAdapter(httpClient);
  const todoPort: TodoPort = new TodosNestServerAdapter(httpClient);
  // usecases
  const createTodoUsecase: CreateTodoUsecase = new CreateTodoUsecase(todoPort);
  const markTodoDoneUsecase: MarkTodoDoneUsecase = new MarkTodoDoneUsecase(
    todoPort,
  );
  const listAllTodoUsecase: ListAllTodoUsecase = new ListAllTodoUsecase(
    todoPort,
  );

  const registerUsecase: RegisterUsecase = new RegisterUsecase(authPort);
  const loginUsecase: LoginUsecase = new LoginUsecase(authPort);
  return {
    todoPort,
    authPort,
    createTodoUsecase,
    markTodoDoneUsecase,
    listAllTodoUsecase,
    registerUsecase,
    loginUsecase,
  };
};

export default getConfigurationContextValue;
