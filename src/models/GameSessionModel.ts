import BaseModel from './BaseModel';

export default interface GameSessionModel extends BaseModel {
  userId: string;
  walletId: string;
  openBalance: number;
  currency: string;
  gameProvideId: string;
  gameId: string;
  gameName: string;
  gameType: string;
  gameCategory: string;
  gameTableId: string;
  //
  pendingBetId: string;
  pendingTransactionId: string;
  status: string;
  //
  url: null | string;
}
