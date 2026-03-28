import BaseModel from './BaseModel';

export default interface ActionModel extends BaseModel {
  ip: string;
  action: string;
  description?: null | string;
  modelId?: null | string;
  modelType?: null | string;
  userId?: null | string;
}
