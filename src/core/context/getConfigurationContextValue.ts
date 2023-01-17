import InMemoryAdapter from '../../adapters/secondaries/in_memory.adapter';
import CreateTodoUsecase from '../../domain/usecasess/createTodo/create_todo.usecase';
import ListAllTodoUsecase from '../../domain/usecasess/listAllTodo/list_all_todo.usecase';
import MarkTodoDoneUsecase from '../../domain/usecasess/markTodoDone/mark_todo_done.usecase';
import {ConfigurationContext} from './ConfigurationContext.type';

const getConfigurationContextValue = (): ConfigurationContext => {
  // adapters
  const inMemoryAdapter: InMemoryAdapter = new InMemoryAdapter();
  // usecases
  const createTodoUsecase: CreateTodoUsecase = new CreateTodoUsecase(
    inMemoryAdapter,
  );
  const markTodoDoneUsecase: MarkTodoDoneUsecase = new MarkTodoDoneUsecase(
    inMemoryAdapter,
  );
  const listAllTodoUsecase: ListAllTodoUsecase = new ListAllTodoUsecase(
    inMemoryAdapter,
  );
  return {
    inMemoryAdapter,
    createTodoUsecase,
    markTodoDoneUsecase,
    listAllTodoUsecase,
  };
};

export default getConfigurationContextValue;
