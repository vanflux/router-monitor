
export class BaseException<T=any> extends Error {
  constructor(message?: string, public detail?: T) {
    super(message);
  }
}
