import {autoInjectable} from 'tsyringe';
import TodoModel from '../models/todo.model';

@autoInjectable()
export default class LocalDatasource {
  static readonly injectorName: 'LocalDatasource';

  protected _allTodo: TodoModel[] = [];

  addTodo(params: {
    title: string;
    description: string | null;
  }): Promise<TodoModel> {
    const {v4: uuidv4} = require('uuid');

    const model = new TodoModel(
      uuidv4(),
      params.description,
      false,
      params.title,
    );
    this._allTodo.push(model);
    return Promise.resolve(model);
  }
}
