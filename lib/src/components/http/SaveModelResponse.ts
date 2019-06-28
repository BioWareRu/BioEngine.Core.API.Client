import {RestResult} from './RestResult';

export class SaveModelResponse<T> extends RestResult {
  public model: T;
}
