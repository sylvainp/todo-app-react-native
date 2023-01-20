/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {StoreProvider} from 'easy-peasy';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {store, useStoreState} from './src/core/store/store';
import {ConfigContext} from './src/core/context/ConfigurationContext';
import getConfigurationContextValue from './src/core/context/getConfigurationContextValue';
import MainScreen from './src/presentation/screens/todos/MainScreen';
import AuthScreen from './src/presentation/screens/auth/AuthScreen';

const onlineScreens = <MainScreen />;
const offlineScreens = <AuthScreen />;
const App = () => {
  const userJWT = useStoreState(state => state.userJWT);

  return (
    <ConfigContext.Provider value={getConfigurationContextValue(userJWT)}>
      <SafeAreaView>
        <StatusBar barStyle={'light-content'} />
        {userJWT ? onlineScreens : offlineScreens}
      </SafeAreaView>
    </ConfigContext.Provider>
  );
};

const AppWrapper = () => {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
};

export default AppWrapper;
