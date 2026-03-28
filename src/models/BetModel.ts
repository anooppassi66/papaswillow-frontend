import BaseModel from './BaseModel';

export default interface BetModel extends BaseModel {
  currency: string;
  amount: number;
  previousBalance: number;
  balance: number;
  transferredAmount: 2000;
  gameId: string;
  gameName: string;
  userId: string;
  transactionId: null | string;
  walletId: string;
  walletBetIndex: number;
  taxId?: string;
  ticketId: string;
  venueId: string;
  providerId: string;
  providerName: string;
  nextTransaction?: null | string;
  time: number;
  type: string;
  status: string;
  //
  gameResult?: null | string;
  betResult?: null | string;
  betStatus: string; //??
  betOn?: string;
  betResultUpdatedAt?: null | string;
  wonAmount?: number;
  deviceId?: null | string;
  eventId?: null | string;
  programId?: null | string;
  saleCenterId?: null | string;
  tableId?: null | string;
  // Operator.
  operatorAmount?: number;
  operatorBetId?: null | string;
  operatorBetType?: null | string;
  operatorCurrency?: null | string;
  operatorGameId?: null | string;
  operatorGameRoundId?: null | string;
  operatorName?: null | string;
  operatorParentBetId?: null | string;
  operatorPlayerId?: null | string;
  operatorResultTime: 1687261727;
  operatorSaleCenterId?: null | string;
  operatorTime?: null | number;
  operatorTransactionType?: null | string;
}
