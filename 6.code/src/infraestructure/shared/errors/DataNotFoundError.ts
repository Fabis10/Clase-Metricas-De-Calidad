export default class DataNotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    Object.setPrototypeOf(this, DataNotFoundError.prototype);
  }
}