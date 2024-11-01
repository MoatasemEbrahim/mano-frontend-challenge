import type { Context } from "hono";
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORAGE_DIR = path.join(__dirname, '../data');

export const listMRF = async (ctx: Context) => {
  try {
    const files: string[] = [];
    try {
      await fs.access(STORAGE_DIR);
      const readFiles = await fs.readdir(STORAGE_DIR);
      // TODO(enhancement): add pagination to the API
      files.push(...readFiles.slice(0, 100))
    } catch (error) {
      return ctx.json({ data: [] });
    }

    if (files.length === 0) {
      return ctx.json({ data: [] });
    }

    const fileList = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(STORAGE_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
      })
    );

    return ctx.json({ data: fileList });
  } catch (error: unknown) {
    return ctx.json({ error: "Something went wrong" }, 400);
  }
};
