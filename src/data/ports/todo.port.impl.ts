import TodoEntity from '../../domain/entities/todo.entities';
import TodoPort from '../../domain/ports/todo.port';
import InMemoryAdapter from '../adapters/in_memory.adapter';
import CreateTodoRequest from '../../domain/usecasess/createTodo/create_todo.usecaserequest';
import MarkTodoDoneRequest from '../../domain/usecasess/markTodoDone/mark_todo_done.usecaserequest';

export default class TodoPortImpl implements TodoPort {
  // private _store;
  constructor(private localDatasource: InMemoryAdapter) {}
  async getAllTodo(): Promise<Error | TodoEntity[]> {
    try {
      const response = await this.localDatasource.getAllTodos();
      return response.map(
        item =>
          new TodoEntity(item.id, item.title, item.description, item.isDone),
      );
    } catch (error) {
      if (error instanceof Error) {
        return Promise.resolve(error);
      } else return Promise.resolve(new Error('unable to getAllTodo'));
    }
  }

  async markTodoDone(
    request: MarkTodoDoneRequest,
  ): Promise<TodoEntity | Error> {
    try {
      const response = await this.localDatasource.markTodoDone(request);
      const updatedEntity = new TodoEntity(
        response.id,
        response.title,
        response.description,
        response.isDone,
      );

      return updatedEntity;
    } catch (error) {
      if (error instanceof Error) {
        return Promise.resolve(error);
      } else {
        return Promise.resolve(new Error('unable to mark todo done'));
      }
    }
  }
  async addTodo(request: CreateTodoRequest): Promise<TodoEntity | Error> {
    try {
      const response = await this.localDatasource.addTodo({
        title: request.title,
        description: request.description,
      });
      return new TodoEntity(
        response.id,
        response.title,
        response.description,
        response.isDone,
      );
    } catch (error) {
      if (error instanceof Error) {
        return Promise.resolve(error);
      } else {
        return Promise.resolve(new Error('Unable to add Todo'));
      }
    }
  }
}
