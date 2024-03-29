import {createContext, useContext} from 'react';
import {ConfigurationContext} from './ConfigurationContext.type';
import getConfigurationContext from './getConfigurationContextValue';

export const ConfigContext = createContext<ConfigurationContext>(
  getConfigurationContext(null),
);

export const useConfig = () => useContext(ConfigContext);
