import 'reflect-metadata';

import {container, Lifecycle} from 'tsyringe';
import LocalDatasource from '../src/data/datasources/local.datasource';
import {TodoRepositoryInjectorName} from '../src/domain/repositories/todo.repository';
import TodoRepositoryMock from './mock/classes/todo.repository.mock';

container.register(
  TodoRepositoryInjectorName,
  {useClass: TodoRepositoryMock},
  {lifecycle: Lifecycle.Singleton},
);

container.register(
  LocalDatasource.injectorName,
  {useClass: LocalDatasource},
  {lifecycle: Lifecycle.Singleton},
);
