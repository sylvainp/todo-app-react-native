import AuthNestServerAdapter from '../../../../src/adapters/secondaries/nestServer/auth.nest.adapter';
import {NestServerHttpClient} from '../../../../src/adapters/secondaries/nestServer/nest.httpclient';
import {LoginUsecaseRequest} from '../../../../src/domain/usecasess/login/login.usecaserequest';
import {RegisterUsecaseRequest} from '../../../../src/domain/usecasess/register/register.usecaserequest';
import {NestServerHttpClientMock} from '../../../mock/classes/nest.httpclient.mock';

describe('AuthNestServerAdapter', () => {
  let adapter: AuthNestServerAdapter;
  let nestServerHttpClient: NestServerHttpClient;
  beforeAll(() => {
    nestServerHttpClient = new NestServerHttpClientMock();
    adapter = new AuthNestServerAdapter(nestServerHttpClient);
  });

  afterEach(async () => {
    await jest.resetAllMocks();
  });

  describe('login function', () => {
    const mockLoginRequest: LoginUsecaseRequest = {
      username: 'username',
      password: 'password',
    };
    it('must call httpclient post function with params', async () => {
      expect.assertions(2);
      jest
        .spyOn(nestServerHttpClient, 'post')
        .mockResolvedValue({statusCode: 200, data: {access_token: 'pok'}});
      await adapter.login(mockLoginRequest);
      expect(nestServerHttpClient.post).toHaveBeenCalledTimes(1);
      expect(nestServerHttpClient.post).toHaveBeenCalledWith(
        'auth/login',
        mockLoginRequest,
      );
    });

    it('must return access token from httpclient post response', async () => {
      expect.assertions(1);
      const expectedAccessToken = 'pok';
      jest.spyOn(nestServerHttpClient, 'post').mockResolvedValue({
        statusCode: 200,
        data: {access_token: expectedAccessToken},
      });

      const response: string | Error = await adapter.login(mockLoginRequest);
      expect(response).toStrictEqual(expectedAccessToken);
    });

    it('must return an error when httpclient return a 401 error response', async () => {
      expect.assertions(2);
      jest
        .spyOn(nestServerHttpClient, 'post')
        .mockResolvedValue({statusCode: 401, message: 'Unauthorized'});
      const response: string | Error = await adapter.login(mockLoginRequest);
      expect(response instanceof Error).toBe(true);
      expect(response).toStrictEqual(new Error('Unauthorized'));
    });
  });

  describe('register function', () => {
    let mockRegisterRequest: RegisterUsecaseRequest = {
      email: 'email',
      familyName: 'familyName',
      givenName: 'givenName',
      password: 'password',
    };

    it('must call httpclient post function', async () => {
      expect.assertions(2);
      jest
        .spyOn(nestServerHttpClient, 'post')
        .mockResolvedValue({data: 'user_id', statusCode: 201});
      await adapter.register(mockRegisterRequest);
      expect(nestServerHttpClient.post).toHaveBeenCalledTimes(1);
      expect(nestServerHttpClient.post).toHaveBeenCalledWith(
        'auth/register',
        mockRegisterRequest,
      );
    });

    it('must return httpclient post response', async () => {
      expect.assertions(1);
      const expectedResult = {statusCode: 200, data: 'user_id'};
      jest
        .spyOn(nestServerHttpClient, 'post')
        .mockResolvedValue(expectedResult);
      const response: string | Error = await adapter.register(
        mockRegisterRequest,
      );
      expect(response).toStrictEqual(expectedResult);
    });
  });
});
