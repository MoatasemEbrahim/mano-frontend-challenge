export interface IClaimRecord {
  claimId: string;
  subscriberId: string;
  memberSequence: string;
  claimStatus: string;
  billed: string;
  allowed: string;
  paid: string;
  paymentStatusDate: string; // date as ISO string
  serviceDate: string;       // date as ISO string
  receivedDate: string;      // date as ISO string
  entryDate: string;         // date as ISO string
  processedDate: string;     // date as ISO string
  paidDate: string;          // date as ISO string
  paymentStatus: string;
  groupName: string;
  groupId: string;
  divisionName: string;
  divisionId: string;
  plan: string;
  planId: string;
  placeOfService: string;
  claimType: string;
  procedureCode: string;
  memberGender: string;
  providerId: string;
  providerName: string;
};
