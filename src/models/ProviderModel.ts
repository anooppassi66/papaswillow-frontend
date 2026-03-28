import BaseModel from './BaseModel';

export default interface ProviderModel extends BaseModel {
  name: string;
  host: string;
  authenticationMethod: string;
  authenticationSecret?: string;
  authenticationPublicKey?: string;
  status?: string;
}
