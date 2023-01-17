import MarkTodoDoneRequest from '../../domain/usecasess/markTodoDone/mark_todo_done.usecaserequest';
import TodoPort from '../../domain/ports/todo.port';
import CreateTodoRequest from '../../domain/usecasess/createTodo/create_todo.usecaserequest';
import TodoEntity from '../../domain/entities/todo.entities';

export default class InMemoryAdapter implements TodoPort {
  static readonly injectorName: 'InMemoryAdapter';

  protected _allTodo: TodoEntity[] = [];

  addTodo(request: CreateTodoRequest): Promise<TodoEntity | Error> {
    const entity = new TodoEntity(
      `${this._allTodo.length + 1}`,
      request.title,
      request.description,
      false,
    );
    this._allTodo.push(entity);
    return Promise.resolve(entity);
  }

  async markTodoDone(
    request: MarkTodoDoneRequest,
  ): Promise<TodoEntity | Error> {
    const index = this._allTodo.findIndex(item => item.id === request.id);
    if (index > -1) {
      const entity: TodoEntity = this._allTodo[index];

      this._allTodo[index] = new TodoEntity(
        entity.id,
        entity.title,
        entity.description,
        request.done,
      );
      // await this.wait(2000);
      return Promise.resolve(this._allTodo[index]);
    } else {
      return Promise.resolve(new Error(`No todo with id ${request.id} found`));
    }
  }
  async getAllTodo(): Promise<TodoEntity[] | Error> {
    return this._allTodo;
  }

  wait = (delay: number): Promise<void> => {
    return new Promise(function (resolve) {
      setTimeout(resolve, delay);
    });
  };
}
