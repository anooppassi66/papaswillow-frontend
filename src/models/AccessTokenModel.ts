import BaseModel from './BaseModel';

export default interface AccessTokenModel extends BaseModel {
  userId: string;
  phone: string;
  username: string;
  selectedWalletId: string;
  ip: string;
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  token: string;
  expiresInDays: number;
  roles?: null | Array<string>;
}
