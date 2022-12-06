import TodoEntity from '../../../src/domain/entities/todo.entities';
import todoEntities from '../../../src/domain/entities/todo.entities';
import TodoRepository from '../../../src/domain/repositories/todo.repository';
import CreateTodoRequest from '../../../src/domain/usecasess/create_todo.usecaserequest';

export default class TodoRepositoryMock implements TodoRepository {
  addTodo(_request: CreateTodoRequest): Promise<Error | todoEntities> {
    return Promise.resolve(new TodoEntity('1', 'title', 'description'));
  }
}
