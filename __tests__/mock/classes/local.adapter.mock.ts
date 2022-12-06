import InMemoryAdapter from '../../../src/data/adapters/in_memory.adapter';
import TodoInMemoryModel from '../../../src/data/models/todo.inmemory.model';

export default class LocalAdapterMock extends InMemoryAdapter {
  get datas(): TodoInMemoryModel[] {
    return this._allTodo;
  }
}
