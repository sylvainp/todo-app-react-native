import InMemoryAdapter from '../../data/adapters/in_memory.adapter';
import TodoPortImpl from '../../data/ports/todo.port.impl';
import TodoPort from '../../domain/ports/todo.port';
import CreateTodoUsecase from '../../domain/usecasess/createTodo/create_todo.usecase';
import ListAllTodoUsecase from '../../domain/usecasess/listAllTodo/list_all_todo.usecase';
import MarkTodoDoneUsecase from '../../domain/usecasess/markTodoDone/mark_todo_done.usecase';
import {ConfigurationContext} from './ConfigurationContext.type';

const getConfigurationContextValue = (): ConfigurationContext => {
  // adapters
  const inMemoryAdapter: InMemoryAdapter = new InMemoryAdapter();
  // ports
  const todoPort: TodoPort = new TodoPortImpl(inMemoryAdapter);
  // usecases
  const createTodoUsecase: CreateTodoUsecase = new CreateTodoUsecase(todoPort);
  const markTodoDoneUsecase: MarkTodoDoneUsecase = new MarkTodoDoneUsecase(
    todoPort,
  );
  const listAllTodoUsecase: ListAllTodoUsecase = new ListAllTodoUsecase(
    todoPort,
  );
  return {
    inMemoryAdapter,
    todoPort,
    createTodoUsecase,
    markTodoDoneUsecase,
    listAllTodoUsecase,
  };
};

export default getConfigurationContextValue;
