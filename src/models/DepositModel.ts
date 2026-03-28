import BaseModel from './BaseModel';

export default interface DepositModel extends BaseModel {
  userId: string;
  transactionId: null | string;
  walletId: string;
  amount: number;
  currency: string;
  status: string;
  statusInfo: null | string;
  error: null | string;
  expiryTime: null | string;
  expiryTimeAt: null | string;
  operatorName: string;
  operatorFunction: null | string;
  operatorVersion: null | string;
  operatorClientId: null | string;
  operatorMerchantId: null | string;
  operatorSubMerchantId: null | string;
  operatorProductCode: null | string;
  operatorAcquirementId: null | string;
  operatorTransactionId: null | string;
  operatorCheckoutUrl: null | string;
}
