import { z } from "zod";

const StringifiedNumberSchema = z.string().refine((val) => {
  const parsed = Number(val);
  return !isNaN(parsed);
}, {
  message: "Invalid number format",
});

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const DateSchema = z.string().regex(dateRegex, {
  message: 'Date must be in the format YYYY-MM-DD',
});

// TODO(enhancement): build more tight schema for better validation like checking the Claim Status from an enum, etc...
export const ClaimSchema = z.object({
  "Claim ID": StringifiedNumberSchema,
  "Subscriber ID": z.string(),
  "Member Sequence": StringifiedNumberSchema,
  "Claim Status": z.string(),
  "Billed": StringifiedNumberSchema,
  "Allowed": StringifiedNumberSchema,
  "Paid": StringifiedNumberSchema,
  "Payment Status Date": DateSchema,
  "Service Date": DateSchema,
  "Received Date": DateSchema,
  "Entry Date": DateSchema,
  "Processed Date": DateSchema,
  "Paid Date": DateSchema,
  "Payment Status": z.string(),
  "Group Name": z.string(),
  "Group ID": z.string(),
  "Division Name": z.string(),
  "Division ID": z.string(),
  "Plan": z.string(),
  "Plan ID": z.string(),
  "Place of Service": z.string(),
  "Claim Type": z.string(),
  "Procedure Code": z.string(),
  "Member Gender": z.string(),
  "Provider ID": StringifiedNumberSchema,
  "Provider Name": z.string(),
});

export type IClaimRecord = z.infer<typeof ClaimSchema>;
