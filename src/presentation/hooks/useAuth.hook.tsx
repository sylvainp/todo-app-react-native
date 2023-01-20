import {useStoreDispatch} from 'easy-peasy';
import {useContext, useState} from 'react';
import {useConfig} from '../../core/context/ConfigurationContext';
import UsecaseResponse from '../../core/usecase/usecase.response';
import {LoginUsecaseRequest} from '../../domain/usecasess/login/login.usecaserequest';
import {RegisterUsecaseRequest} from '../../domain/usecasess/register/register.usecaserequest';
import {useStoreActions} from '../../core/store/store';

const useAuth = () => {
  const {registerUsecase, loginUsecase} = useConfig();
  const [authError, setError] = useState<string | null>(null);
  const [authSuccess, setSuccessMessage] = useState<string | null>();
  const updateJWT = useStoreActions(action => action.updateJWT);

  const register = async (request: RegisterUsecaseRequest): Promise<void> => {
    const response: UsecaseResponse<void> = await registerUsecase.call(request);
    if (response.error) {
      setError(response.error.message);
      setSuccessMessage(null);
    } else {
      setError(null);
      setSuccessMessage(`Le compte ${request.email} a bien été créé !`);
    }
  };

  const login = async (request: LoginUsecaseRequest): Promise<void> => {
    const response: UsecaseResponse<string> = await loginUsecase.call(request);
    if (response.error) {
      setError(response.error.message);
    } else {
      setError(null);
      updateJWT(response.data!);
    }
  };

  return {register, login, authError, authSuccess};
};

export default useAuth;
