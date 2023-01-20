import UsecaseResponse from '../../src/core/usecase/usecase.response';
import {AuthPort} from '../../src/domain/ports/auth.port';
import LoginUsecase from '../../src/domain/usecasess/login/login.usecase';
import {LoginUsecaseRequest} from '../../src/domain/usecasess/login/login.usecaserequest';
import AuthPortMock from '../mock/classes/auth.port.mock';

describe('LoginUsecase', () => {
  let authPort: AuthPort;
  let loginUsecase: LoginUsecase;
  const mockLoginRequestParam: LoginUsecaseRequest = {
    username: 'username',
    password: 'password',
  };
  beforeAll(() => {
    authPort = new AuthPortMock();
    loginUsecase = new LoginUsecase(authPort);
  });

  it('call function must call authPort login function with params', async () => {
    expect.assertions(2);
    jest.spyOn(authPort, 'login').mockResolvedValue('access_token');
    await loginUsecase.call(mockLoginRequestParam);
    expect(authPort.login).toHaveBeenCalledTimes(1);
    expect(authPort.login).toHaveBeenCalledWith(mockLoginRequestParam);
  });

  it('call function must return a usecaseResponse with auth port login returned data ', async () => {
    expect.assertions(2);
    const expectedResult = 'access_token';
    jest.spyOn(authPort, 'login').mockResolvedValue(expectedResult);
    const response: UsecaseResponse<string> = await loginUsecase.call(
      mockLoginRequestParam,
    );
    expect(response.error).toBeNull();
    expect(response.data).toStrictEqual(expectedResult);
  });

  it('call function must return usecaseResponse with error if authPort login function return an error', async () => {
    expect.assertions(2);
    const expectedError = new Error('unable to login');
    jest.spyOn(authPort, 'login').mockResolvedValue(expectedError);
    const response: UsecaseResponse<string> = await loginUsecase.call(
      mockLoginRequestParam,
    );
    expect(response.error).toStrictEqual(expectedError);
    expect(response.data).toBeNull();
  });
});
