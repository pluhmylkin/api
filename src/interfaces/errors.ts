import { IDetail } from './detail';

export interface IError {
  code: string;
  message: string;
  details?: IDetail[];
}
