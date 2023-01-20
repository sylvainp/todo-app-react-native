import TodoEntity from '../../../src/domain/entities/todo.entities';
import todoEntities from '../../../src/domain/entities/todo.entities';
import TodoPort from '../../../src/domain/ports/todo.port';
import CreateTodoRequest from '../../../src/domain/usecasess/createTodo/create_todo.usecaserequest';
import mark_todo_doneUsecaserequest from '../../../src/domain/usecasess/markTodoDone/mark_todo_done.usecaserequest';

export default class TodoPortMock implements TodoPort {
  getAllTodo(): Promise<Error | TodoEntity[]> {
    throw new Error('Method not implemented.');
  }
  markTodoDone(
    request: mark_todo_doneUsecaserequest,
  ): Promise<Error | TodoEntity> {
    throw new Error('Method not implemented.');
  }
  addTodo(_request: CreateTodoRequest): Promise<Error | todoEntities> {
    return Promise.resolve(new TodoEntity('1', 'title'));
  }
}
