import {autoInjectable} from 'tsyringe';
import MarkTodoDoneRequest from '../../domain/usecasess/markTodoDone/mark_todo_done.usecaserequest';
import TodoInMemoryModel from '../models/todo.inmemory.model';

@autoInjectable()
export default class InMemoryAdapter {
  static readonly injectorName: 'InMemoryAdapter';

  protected _allTodo: TodoInMemoryModel[] = [];

  addTodo(params: {
    title: string;
    description: string | null;
  }): Promise<TodoInMemoryModel> {
    // const isError = Math.random() < 0.5;
    // if (isError) {
    //   return Promise.reject(new Error('Unable to create todo'));
    // }

    const model = new TodoInMemoryModel(
      `${this._allTodo.length + 1}`,
      params.description,
      false,
      params.title,
    );
    this._allTodo.push(model);

    return Promise.resolve(model);
  }

  async markTodoDone(params: MarkTodoDoneRequest): Promise<TodoInMemoryModel> {
    const index = this._allTodo.findIndex(item => item.id === params.id);
    if (index > -1) {
      const model: TodoInMemoryModel = this._allTodo[index];
      model.done = params.done;
      this._allTodo[index] = model;
      await this.wait(2000);
      return Promise.resolve(model);
    } else {
      return Promise.reject(new Error(`No todo with id ${params.id} found`));
    }
  }

  async getAllTodos(): Promise<TodoInMemoryModel[]> {
    return this._allTodo;
  }

  wait = (delay: number): Promise<void> => {
    return new Promise(function (resolve) {
      setTimeout(resolve, delay);
    });
  };
}
