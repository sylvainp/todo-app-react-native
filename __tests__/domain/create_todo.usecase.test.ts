import UsecaseResponse from '../../src/core/usecase/usecase.response';
import TodoEntity from '../../src/domain/entities/todo.entities';
import TodoPort from '../../src/domain/ports/todo.port';
import CreateTodoUsecase from '../../src/domain/usecasess/createTodo/create_todo.usecase';
import CreateTodoRequest from '../../src/domain/usecasess/createTodo/create_todo.usecaserequest';
import useConfigMock from '../mock/classes/MockConfigurationContext';

describe('CreateTodoUsecase', () => {
  let usecase: CreateTodoUsecase;
  let todoAdapter: TodoPort;
  const mockCreateTodoRequest: CreateTodoRequest = {
    title: 'title',
    description: 'description',
  };
  beforeAll(() => {
    const {inMemoryAdapter, createTodoUsecase} = useConfigMock();
    todoAdapter = inMemoryAdapter;
    usecase = createTodoUsecase;
  });

  it('usecase must be resolve by DI', async () => {
    expect.assertions(1);
    expect(usecase).toBeDefined();
  });

  it('call function must call addTodo todoPort function with params', async () => {
    expect.assertions(2);
    jest.spyOn(todoAdapter, 'addTodo').mockImplementation();
    await usecase.call(mockCreateTodoRequest);
    expect(todoAdapter.addTodo).toHaveBeenCalledTimes(1);
    expect(todoAdapter.addTodo).toHaveBeenCalledWith(mockCreateTodoRequest);
  });

  it('call function must return a usecaseResponse with todoEntity returned by port', async () => {
    expect.assertions(2);
    const expectedTodoEntity = new TodoEntity(
      '1',
      mockCreateTodoRequest.title,
      mockCreateTodoRequest.description,
    );
    jest.spyOn(todoAdapter, 'addTodo').mockResolvedValue(expectedTodoEntity);
    const response: UsecaseResponse<TodoEntity> = await usecase.call(
      mockCreateTodoRequest,
    );
    expect(response.data).toStrictEqual(expectedTodoEntity);
    expect(response.error).toBeNull();
  });

  it('call function must return a usecaseResponse with error returned by port', async () => {
    expect.assertions(2);
    const expectedError = new Error('my error');
    jest.spyOn(todoAdapter, 'addTodo').mockResolvedValue(expectedError);
    const result: UsecaseResponse<TodoEntity> = await usecase.call(
      mockCreateTodoRequest,
    );
    expect(result.data).toBeNull();
    expect(result.error).toStrictEqual(expectedError);
  });
});
