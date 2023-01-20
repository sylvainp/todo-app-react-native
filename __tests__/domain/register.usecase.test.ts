import UsecaseResponse from '../../src/core/usecase/usecase.response';
import {AuthPort} from '../../src/domain/ports/auth.port';
import RegisterUsecase from '../../src/domain/usecasess/register/register.usecase';
import {RegisterUsecaseRequest} from '../../src/domain/usecasess/register/register.usecaserequest';
import AuthPortMock from '../mock/classes/auth.port.mock';

describe('RegisterUsecase', () => {
  let registerUsecase: RegisterUsecase;
  let authPort: AuthPort;
  const mockRegisterRequest: RegisterUsecaseRequest = {
    email: 'email',
    familyName: 'familyName',
    givenName: 'givenName',
    password: 'password',
  };
  beforeAll(() => {
    authPort = new AuthPortMock();
    registerUsecase = new RegisterUsecase(authPort);
  });

  it('call function must call authPort register function with params', async () => {
    expect.assertions(2);
    jest.spyOn(authPort, 'register').mockResolvedValue('user_id');
    await registerUsecase.call(mockRegisterRequest);
    expect(authPort.register).toHaveBeenCalledTimes(1);
    expect(authPort.register).toHaveBeenCalledWith(mockRegisterRequest);
  });

  it('call function must return UsecaseResponse with null data when authPort register function succeed', async () => {
    expect.assertions(2);
    jest.spyOn(authPort, 'register').mockResolvedValue('user_id');
    const result: UsecaseResponse<void> = await registerUsecase.call(
      mockRegisterRequest,
    );
    expect(result.data).toBeNull();
    expect(result.error).toBeNull();
  });

  it('call function must return UsecaseResponse with erorr if authPort return an Error', async () => {
    expect.assertions(2);
    const expectedError = new Error('Unable to register new User');
    jest.spyOn(authPort, 'register').mockResolvedValue(expectedError);
    const response: UsecaseResponse<void> = await registerUsecase.call(
      mockRegisterRequest,
    );
    expect(response.data).toBeNull();
    expect(response.error).toStrictEqual(expectedError);
  });
});
