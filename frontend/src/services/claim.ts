import { IClaimRecord } from "../types/claim"

export const createMRF = (payload: IClaimRecord[]) => 
  fetch("http://localhost:8080/api/mrf", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
;

export const listMRF = () =>
  fetch("http://localhost:8080/api/mrf", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
