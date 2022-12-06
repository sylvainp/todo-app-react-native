import InMemoryAdapter from '../../src/data/adapters/in_memory.adapter';
import LocalAdapterMock from '../mock/classes/local.adapter.mock';

describe('LocalDatasource', () => {
  let localDatasource: LocalAdapterMock;
  beforeAll(() => {
    localDatasource = new LocalAdapterMock();
  });

  it('addTodo must add a TodoModel into datas', async () => {
    expect.assertions(2);
    const params = {description: 'desc', title: 'title'};
    expect(localDatasource.datas.length).toStrictEqual(0);
    await localDatasource.addTodo(params);
    expect(localDatasource.datas.length).toStrictEqual(1);
  });
});
