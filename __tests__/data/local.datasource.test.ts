import LocalDatasource from '../../src/data/datasources/local.datasource';
import LocalDatasourceMock from '../mock/classes/local.datasource.mock';

describe('LocalDatasource', () => {
  let localDatasource: LocalDatasourceMock;
  beforeAll(() => {
    localDatasource = new LocalDatasourceMock();
  });

  it('addTodo must add a TodoModel into datas', async () => {
    expect.assertions(2);
    const params = {description: 'desc', title: 'title'};
    expect(localDatasource.datas.length).toStrictEqual(0);
    await localDatasource.addTodo(params);
    expect(localDatasource.datas.length).toStrictEqual(1);
  });
});
