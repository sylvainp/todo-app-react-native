import {container, Lifecycle} from 'tsyringe';
import InMemoryAdapter from '../../src/data/adapters/in_memory.adapter';
import TodoInMemoryModel from '../../src/data/models/todo.inmemory.model';
import TodoPortImpl from '../../src/data/ports/todo.port.impl';
import TodoEntity from '../../src/domain/entities/todo.entities';
import {TodoPortInjectorName} from '../../src/domain/ports/todo.port';
import CreateTodoRequest from '../../src/domain/usecasess/createTodo/create_todo.usecaserequest';

describe('TodoPortImpl', () => {
  let todoPortImpl: TodoPortImpl;
  let localAdapter: InMemoryAdapter;
  const mockCreateTodoRequest: CreateTodoRequest = {
    title: 'title',
    description: 'description',
  };

  beforeAll(() => {
    container.register(
      TodoPortInjectorName,
      {useClass: TodoPortImpl},
      {lifecycle: Lifecycle.Singleton},
    );

    localAdapter = container.resolve(InMemoryAdapter.injectorName);
    todoPortImpl = container.resolve(TodoPortInjectorName);
  });

  it('port must be resolved by DI', () => {
    expect.assertions(1);
    expect(todoPortImpl).toBeDefined();
  });

  describe('addTodo', () => {
    it('must call localAdapter addTodo function with params', async () => {
      expect.assertions(1);
      jest
        .spyOn(localAdapter, 'addTodo')
        .mockResolvedValue(
          new TodoInMemoryModel(
            '1',
            mockCreateTodoRequest.description,
            false,
            mockCreateTodoRequest.title,
          ),
        );
      await todoPortImpl.addTodo(mockCreateTodoRequest);
      expect(localAdapter.addTodo).toHaveBeenCalledWith({
        description: mockCreateTodoRequest.description,
        title: mockCreateTodoRequest.title,
      });
    });

    it('must return TodoEntity build from TodoModel returned by localAdapter', async () => {
      expect.assertions(1);
      const mockTodoModel: TodoInMemoryModel = new TodoInMemoryModel(
        '1',
        mockCreateTodoRequest.description,
        false,
        mockCreateTodoRequest.title,
      );
      jest.spyOn(localAdapter, 'addTodo').mockResolvedValue(mockTodoModel);
      const result: TodoEntity | Error = await todoPortImpl.addTodo(
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
