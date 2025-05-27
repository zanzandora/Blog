export interface CommonError<T = unknown> {
  message: string;
  extra?: T;
}
