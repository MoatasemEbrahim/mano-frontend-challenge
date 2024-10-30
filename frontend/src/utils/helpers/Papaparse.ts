import { IClaimRecord } from "../../types/claim";

export interface IPapaparseResult {
  data: IClaimRecord[];
  errors: {type: string, code: string, message: string, row?: string }[];
}

export interface IPapaparseClaimsResult {
  data: IClaimRecord[];
  errors: string[];
}
