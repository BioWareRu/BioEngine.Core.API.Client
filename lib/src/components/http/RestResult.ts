import {RestError} from './RestError';

export class RestResult {
  public code: number;
  public errors: Array<RestError> = [];
  public message: string;
  public isSuccess: boolean;
}
