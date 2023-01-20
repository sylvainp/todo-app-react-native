import getConfigurationContextValue from '../../../src/core/context/getConfigurationContextValue';

const useConfigMock = () => {
  return getConfigurationContextValue(null);
};

export default useConfigMock;
