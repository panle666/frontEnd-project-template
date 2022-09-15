export interface IApiResult<T> {
  Code: number;
  Result: boolean;
  Message: string;
  Data: T;
}
