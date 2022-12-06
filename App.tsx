/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {container, Lifecycle} from 'tsyringe';
import InMemoryAdapter from './src/data/adapters/in_memory.adapter';
import TodoPortImpl from './src/data/ports/todo.port.impl';
import {TodoPortInjectorName} from './src/domain/ports/todo.port';
import MainScreen from './src/presentation/MainScreen';
const App = () => {
  container
    .register(
      InMemoryAdapter.injectorName,
      {useClass: InMemoryAdapter},
      {lifecycle: Lifecycle.Singleton},
    )
    .register(
      TodoPortInjectorName,
      {useClass: TodoPortImpl},
      {lifecycle: Lifecycle.Singleton},
    );
  const repo: TodoPortImpl = container.resolve(TodoPortInjectorName);
  return (
    <SafeAreaView>
      <StatusBar />
      <MainScreen />
    </SafeAreaView>
  );
};

export default App;
