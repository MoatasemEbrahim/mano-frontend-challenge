import { IClaimRecord } from "../types/claim";

const API_URL = import.meta.env.VITE_API_URL;

export const createMRF = (payload: IClaimRecord[]) => 
  fetch(`${API_URL}/api/mrf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
;

export const listMRF = () =>
  fetch(`${API_URL}/api/mrf`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
