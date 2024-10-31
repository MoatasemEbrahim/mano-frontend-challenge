import type { Context } from "hono";
import type { IClaimRecord } from '../types/claim.ts';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateClaim } from '../helpers/claimValidation.js';
import { groupByKeys } from "../helper/array.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORAGE_DIR = path.join(__dirname, '../data');

export const creatMRF = async (ctx: Context) => {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating storage directory:', error);
  }

  try {
    const data = await ctx.req.json<IClaimRecord[]>();
    const validationErrors = data.map(validateClaim).filter((result) => result.error);
    if (validationErrors.length > 0) {
      const errors = validationErrors.map(result => result.error?.errors)
      return ctx.json({ message: 'Invalid claims payload', errors }, 400);
    }

    const mrfRecords = groupByKeys(data, ["Provider Name", "Procedure Code", "Place of Service", "Claim Type"])
    for (const [name, value] of mrfRecords) {
      const filename = `${name}:${Date.now()}.json`;
      const filepath = path.join(STORAGE_DIR, filename);
      fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf8');
    }

    return ctx.json({ message: 'Data saved successfully' });
  } catch (error: unknown) {
    return ctx.json({ error: "Something went wrong" }, 400);
  }
}