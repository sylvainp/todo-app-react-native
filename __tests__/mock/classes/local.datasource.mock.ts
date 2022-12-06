import LocalDatasource from '../../../src/data/datasources/local.datasource';
import TodoModel from '../../../src/data/models/todo.model';

export default class LocalDatasourceMock extends LocalDatasource {
  get datas(): TodoModel[] {
    return this._allTodo;
  }
}
