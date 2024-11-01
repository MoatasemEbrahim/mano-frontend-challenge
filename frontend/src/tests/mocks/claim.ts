import { IClaimRecord } from "../../types/claim";

export const validClaim: IClaimRecord = {
  "Claim ID": "1391760987204",
  "Subscriber ID": "B5703463xK",
  "Member Sequence": "6",
  "Claim Status": "Payable",
  "Billed": "4703.20",
  "Allowed": "2383.32",
  "Paid": "1054.56",
  "Payment Status Date": "2024-12-13",
  "Service Date": "2024-10-10",
  "Received Date": "2024-11-19",
  "Entry Date": "2024-11-21",
  "Processed Date": "2024-12-07",
  "Paid Date": "2024-12-13",
  "Payment Status": "Paid",
  "Group Name": "Global Enterprises",
  "Group ID": "GLE003",
  "Division Name": "North",
  "Division ID": "N",
  "Plan": "Premium Care Plan",
  "Plan ID": "PCP002",
  "Place of Service": "Outpatient Hospital",
  "Claim Type": "Professional",
  "Procedure Code": "s5301",
  "Member Gender": "Female",
  "Provider ID": "6388663927",
  "Provider Name": "Michael Poole"
}

export const inValidClaim: IClaimRecord = {
  ...validClaim,
  "Claim ID": null
}
