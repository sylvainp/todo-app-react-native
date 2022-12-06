import {container, Lifecycle} from 'tsyringe';
import LocalDatasource from '../../src/data/datasources/local.datasource';
import TodoModel from '../../src/data/models/todo.model';
import TodoRepositoryImpl from '../../src/data/repositories/todo.repository.impl';
import TodoEntity from '../../src/domain/entities/todo.entities';
import {TodoRepositoryInjectorName} from '../../src/domain/repositories/todo.repository';
import CreateTodoRequest from '../../src/domain/usecasess/create_todo.usecaserequest';

describe('TodoRepositoryImpl', () => {
  let todoRepositoryImpl: TodoRepositoryImpl;
  let localDatasource: LocalDatasource;
  const mockCreateTodoRequest: CreateTodoRequest = {
    title: 'title',
    description: 'description',
  };

  beforeAll(() => {
    container.register(
      TodoRepositoryInjectorName,
      {useClass: TodoRepositoryImpl},
      {lifecycle: Lifecycle.Singleton},
    );

    localDatasource = container.resolve(LocalDatasource.injectorName);
    todoRepositoryImpl = container.resolve(TodoRepositoryInjectorName);
  });

  it('repository must be resolved by DI', () => {
    expect.assertions(1);
    expect(todoRepositoryImpl).toBeDefined();
  });

  describe('addTodo', () => {
    it('must call localDatasource addTodo function with params', async () => {
      expect.assertions(1);
      jest
        .spyOn(localDatasource, 'addTodo')
        .mockResolvedValue(
          new TodoModel(
            '1',
            mockCreateTodoRequest.description,
            false,
            mockCreateTodoRequest.title,
          ),
        );
      await todoRepositoryImpl.addTodo(mockCreateTodoRequest);
      expect(localDatasource.addTodo).toHaveBeenCalledWith({
        description: mockCreateTodoRequest.description,
        title: mockCreateTodoRequest.title,
      });
    });

    it('must return TodoEntity build from TodoModel returned by localDatasource', async () => {
      expect.assertions(1);
      const mockTodoModel: TodoModel = new TodoModel(
        '1',
        mockCreateTodoRequest.description,
        false,
        mockCreateTodoRequest.title,
      );
      jest.spyOn(localDatasource, 'addTodo').mockResolvedValue(mockTodoModel);
      const result: TodoEntity | Error = await todoRepositoryImpl.addTodo(
        mockCreateTodoRequest,
      );
      expect(result).toStrictEqual(
        new TodoEntity(
          mockTodoModel.id,
          mockTodoModel.title,
          mockTodoModel.description,
        ),
      );
    });
  });
});
