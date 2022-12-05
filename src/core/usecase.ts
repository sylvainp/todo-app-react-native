import UsecaseRequest from './usecase.request';
import UsecaseResponse from './usecase.response';

export default abstract class Usecase<R extends UsecaseRequest, T> {
  abstract call(request: R): UsecaseResponse<T>;
}
