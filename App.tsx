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
import {ConfigContext} from './src/core/context/ConfigurationContext';
import getConfigurationContextValue from './src/core/context/getConfigurationContextValue';
import InMemoryAdapter from './src/data/adapters/in_memory.adapter';
import TodoPortImpl from './src/data/ports/todo.port.impl';
import {TodoPortInjectorName} from './src/domain/ports/todo.port';
import MainScreen from './src/presentation/MainScreen';
const App = () => {
  return (
    <ConfigContext.Provider value={getConfigurationContextValue()}>
      <SafeAreaView>
        <StatusBar />
        <MainScreen />
      </SafeAreaView>
    </ConfigContext.Provider>
  );
};

export default App;
