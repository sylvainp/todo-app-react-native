import TodoEntity from '../../../domain/entities/todo.entities';
import TodoPort from '../../../domain/ports/todo.port';
import CreateTodoRequest from '../../../domain/usecasess/createTodo/create_todo.usecaserequest';
import MarkTodoDoneRequest from '../../../domain/usecasess/markTodoDone/mark_todo_done.usecaserequest';
import {NestHttpResponse, NestServerHttpClient} from './nest.httpclient';

export class TodosNestServerAdapter implements TodoPort {
  constructor(private readonly httpClient: NestServerHttpClient) {}
  async addTodo(request: CreateTodoRequest): Promise<TodoEntity | Error> {
    const response = await this.httpClient.post('todos/add', request);
    if (response.statusCode > 300) {
      return new Error('Unable to create todo');
    }
    return new TodoEntity(
      response.data.id,
      response.data.title,
      response.data.done,
    );
  }
  async getAllTodo(): Promise<TodoEntity[] | Error> {
    const response = await this.httpClient.get('todos');
    if (response.statusCode > 300) {
      return new Error("Can't retrieve todos");
    }
    return response.data.map(
      (item: any) => new TodoEntity(item.id, item.title, item.done),
    );
  }
  async markTodoDone(
    request: MarkTodoDoneRequest,
  ): Promise<TodoEntity | Error> {
    const response: NestHttpResponse = await this.httpClient.patch(
      'todos/markDone',
      {todoId: request.id, done: request.done},
    );
    if (response.statusCode > 300) {
      return new Error(response.message);
    }
    return new TodoEntity(
      response.data.id,
      response.data.title,
      response.data.done,
    );
  }
}
