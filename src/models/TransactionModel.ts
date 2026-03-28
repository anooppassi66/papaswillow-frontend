import BaseModel from './BaseModel';

export default interface TransactionModel extends BaseModel {
  type: string;
  userId: string;
  currency: string;
  previousBalance: number;
  balance: number;
  status: string;
  remark?: null | string;
  // User
  senderUserId?: null | string;
  receiverUserId?: null | string;
  // Wallet
  walletId: string;
  receiverWalletId?: string;
  receiverWalletBetIndex?: number;

  senderWalletPreviousTransactionId?: string;
  senderWalletTransactionIndex?: number;

  senderWalletId?: string;
  senderWalletBetIndex?: number;

  // Deposit / Withdraw.
  deposit?: number;
  withdraw?: number;
  //
  betAmount?: number;
  // payoutAmount?: number;
  income?: number;
  wonAmount?: number; // payoutAmount
  expenses?: number;
  // Transaction
  prevTransactionId?: string;
  // Bet.
  gameName?: string;
  providerId?: null | string;
  betId?: string;
  betPlacedBalance?: number;
  betResult?: string;
  betResultUpdatedAt?: string;
  betStatus?: string;
  // Operator data
  operatorParentBetId?: null | string;
  operatorPlayerId?: null | string;
  operatorResultTime?: null | number; // unix timestamp
  operatorSaleCenterId?: null | string;
  operatorGameId?: null | string;
  operatorName?: null | string;
  operatorTransactionType?: null | string;
  operatorBetId?: null | string;
  operatorBetType?: null | string;
  operatorGameRoundId?: null | string;
  operatorCurrency?: null | number;
  operatorAmount?: null | number;
  operatorTime?: null | number;
}
