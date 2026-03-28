import BaseModel from './BaseModel';

export default interface WalletModel extends BaseModel {
  userId: string;
  name: string;
  currency: string;
  balance: number;
  status: string;
  type: string;

  lastDepositId: null | string;
  lastTransactionId: null | string;
  lastBetId: null | string;
  deposits: null | number;
  bets: null | number;
  transactions: null | number;
}
