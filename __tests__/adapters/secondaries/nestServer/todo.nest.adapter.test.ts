import {NestServerHttpClient} from '../../../../src/adapters/secondaries/nestServer/nest.httpclient';
import {TodosNestServerAdapter} from '../../../../src/adapters/secondaries/nestServer/todos.nest.adapter';
import TodoEntity from '../../../../src/domain/entities/todo.entities';
import CreateTodoRequest from '../../../../src/domain/usecasess/createTodo/create_todo.usecaserequest';
import MarkTodoDoneRequest from '../../../../src/domain/usecasess/markTodoDone/mark_todo_done.usecaserequest';
import {NestServerHttpClientMock} from '../../../mock/classes/nest.httpclient.mock';

describe('TodosNestServerAdapter', () => {
  let httpClient: NestServerHttpClient;
  let adapter: TodosNestServerAdapter;

  beforeAll(() => {
    httpClient = new NestServerHttpClientMock();
    adapter = new TodosNestServerAdapter(httpClient);
  });
  describe('AddTodo function', () => {
    const mockCreateTodoRequest: CreateTodoRequest = {title: 'todo 1'};
    const expectedHttpTodoResponse = {
      data: {
        id: '69ede559-98a5-400b-ac2d-e4eb22fd82c7',
        title: 'todo 1',
      },
      statusCode: 200,
    };
    it('must call httpclient post function with params', async () => {
      expect.assertions(2);

      jest
        .spyOn(httpClient, 'post')
        .mockResolvedValue(expectedHttpTodoResponse);
      await adapter.addTodo(mockCreateTodoRequest);
      expect(httpClient.post).toHaveBeenCalledTimes(1);
      expect(httpClient.post).toHaveBeenCalledWith(
        'todos/add',
        mockCreateTodoRequest,
      );
    });

    it('must return added TodoEntity build from httpclient response ', async () => {
      expect.assertions(2);
      jest
        .spyOn(httpClient, 'post')
        .mockResolvedValue(expectedHttpTodoResponse);
      const response: TodoEntity | Error = await adapter.addTodo(
        mockCreateTodoRequest,
      );
      expect(response instanceof TodoEntity).toBe(true);
      expect(response).toStrictEqual(
        new TodoEntity(
          expectedHttpTodoResponse.data.id,
          expectedHttpTodoResponse.data.title,
        ),
      );
    });

    it('must return an Error if http post failed', async () => {
      expect.assertions(1);
      jest
        .spyOn(httpClient, 'post')
        .mockResolvedValue({statusCode: 500, message: 'unexpectedError'});
      const response: TodoEntity | Error = await adapter.addTodo(
        mockCreateTodoRequest,
      );
      expect(response).toStrictEqual(new Error('Unable to create todo'));
    });
  });
  describe('getAllTodo function', () => {
    const expectedResponse = {
      statusCode: 200,
      data: [{id: '1', title: 'todo 1'}],
    };
    it('must call httpclient get function', async () => {
      expect.assertions(2);
      jest
        .spyOn(httpClient, 'get')
        .mockResolvedValue({statusCode: 200, data: []});
      await adapter.getAllTodo();
      expect(httpClient.get).toHaveBeenCalledTimes(1);
      expect(httpClient.get).toHaveBeenCalledWith('todos');
    });

    it('must return TodoEntity array build from httplient get response', async () => {
      expect.assertions(2);
      jest.spyOn(httpClient, 'get').mockResolvedValue(expectedResponse);
      const response: TodoEntity[] | Error = await adapter.getAllTodo();
      expect(response instanceof Array).toBe(true);
      expect(response).toStrictEqual([new TodoEntity('1', 'todo 1')]);
    });

    it('must return an error if httpclient return an error ', async () => {
      expect.assertions(2);
      jest
        .spyOn(httpClient, 'get')
        .mockResolvedValue({statusCode: 500, message: 'Unable to get todos'});
      const response: TodoEntity[] | Error = await adapter.getAllTodo();
      expect(response instanceof Error).toBe(true);
      expect(response).toStrictEqual(new Error("Can't retrieve todos"));
    });
  });
  describe('markTodoDone function', () => {
    const mockRequest: MarkTodoDoneRequest = {id: '1', done: true};
    it('must call httpClient patch function with parameters', async () => {
      expect.assertions(2);
      jest
        .spyOn(httpClient, 'patch')
        .mockResolvedValue({statusCode: 200, data: {id: '1', title: 'todo 1'}});
      adapter.markTodoDone(mockRequest);
      expect(httpClient.patch).toHaveBeenCalledTimes(1);
      expect(httpClient.patch).toHaveBeenCalledWith('todos/markDone', {
        todoId: mockRequest.id,
        done: mockRequest.done,
      });
    });
    it('must return todoEntity build from httpclient patch response', async () => {
      expect.assertions(2);
      jest.spyOn(httpClient, 'patch').mockResolvedValue({
        statusCode: 200,
        data: {id: mockRequest.id, title: 'todo1', done: mockRequest.done},
      });
      const response: TodoEntity | Error = await adapter.markTodoDone(
        mockRequest,
      );
      expect(response instanceof TodoEntity).toBe(true);
      expect(response).toStrictEqual(
        new TodoEntity(mockRequest.id, 'todo1', mockRequest.done),
      );
    });

    it('must return an error if httpclient request return another code of 200', async () => {
      expect.assertions(2);
      jest
        .spyOn(httpClient, 'patch')
        .mockResolvedValue({statusCode: 401, message: 'Unauthorized'});
      const response: TodoEntity | Error = await adapter.markTodoDone(
        mockRequest,
      );
      expect(response instanceof Error).toBe(true);
      expect(response).toStrictEqual(new Error('Unauthorized'));
    });
  });
});
