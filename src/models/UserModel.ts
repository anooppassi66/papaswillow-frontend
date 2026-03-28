import BaseModel from './BaseModel';

export const KYC_STATUS_VERIFIED = 'VERIFIED';
export const KYC_STATUS_PENDING = 'PENDING';

export type UserModelKYCType = 'PENDING' | 'VERIFIED' | null;

export default interface UserModel extends BaseModel {
  firstName?: null | string;
  middleName?: null | string;
  lastName?: null | string;
  username?: null | string;
  agent?: null | string;
  dob?: null | string;
  // Selected wallet.
  selectedWalletId?: null | string;
  // Phone
  phone?: null | string;
  phoneVerified?: boolean;
  // Email
  email?: null | string;
  emailVerified?: boolean;
  // KYC
  kycDocuments?: null | Array<string>;
  kycSelfies?: null | Array<string>;
  kycIDNumber?: null | string;
  kycDocumentType?: null | string;
  kycVerified?: null | UserModelKYCType;
  kycDeclinedReason?: null | string;
  kycDeclinedRemarks?: null | string;
  // Address.
  city?: null | string;
  address1?: null | string;
  address2?: null | string;
  postalCode?: null | string;
  countryCode?: null | string;
  // Income
  income?: null | string;
  sourceOfIncome?: null | string;
  occupation?: null | string;
  // Admin role
  roles?: null | Array<string>;
  // Consents
  ageConsent?: boolean;
  govtOfficialConsent?: boolean;
  armedForceConsent?: boolean;
  //status
  status?: null | string;
}
