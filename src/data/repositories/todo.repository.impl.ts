import {autoInjectable, inject} from 'tsyringe';
import TodoEntity from '../../domain/entities/todo.entities';
import TodoRepository from '../../domain/repositories/todo.repository';
import CreateTodoRequest from '../../domain/usecasess/create_todo.usecaserequest';
import LocalDatasource from '../datasources/local.datasource';
import TodoModel from '../models/todo.model';

@autoInjectable()
export default class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @inject(LocalDatasource.injectorName)
    private localDatasource: LocalDatasource,
  ) {}
  async addTodo(request: CreateTodoRequest): Promise<TodoEntity | Error> {
    const result: TodoModel = await this.localDatasource.addTodo({
      description: request.description,
      title: request.title,
    });
    return new TodoEntity(result.id, result.title, result.description);
  }
}
