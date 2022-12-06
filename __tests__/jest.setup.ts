import 'reflect-metadata';

import {container, Lifecycle} from 'tsyringe';
import InMemoryAdapter from '../src/data/adapters/in_memory.adapter';
import {TodoPortInjectorName} from '../src/domain/ports/todo.port';
import TodoPortMock from './mock/classes/todo.port.mock';

container.register(
  TodoPortInjectorName,
  {useClass: TodoPortMock},
  {lifecycle: Lifecycle.Singleton},
);

container.register(
  InMemoryAdapter.injectorName,
  {useClass: InMemoryAdapter},
  {lifecycle: Lifecycle.Singleton},
);
