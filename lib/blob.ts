import { put, list } from '@vercel/blob';

const BLOB_PATHNAME = 'analytics/events.csv';
export const CSV_HEADER = 'timestamp,event_type,details,page\n';

export async function readCSV(): Promise<string> {
  try {
    const { blobs } = await list({ prefix: BLOB_PATHNAME });
    if (blobs.length === 0) return CSV_HEADER;
    const res = await fetch(blobs[0].downloadUrl, { cache: 'no-store' });
    if (!res.ok) return CSV_HEADER;
    return await res.text();
  } catch {
    return CSV_HEADER;
  }
}

export async function writeCSV(content: string): Promise<void> {
  await put(BLOB_PATHNAME, content, {
    access: 'private',
    addRandomSuffix: false,
  });
}

export async function appendCSVRow(row: string): Promise<void> {
  const current = await readCSV();
  const base = current.endsWith('\n') ? current : current + '\n';
  await writeCSV(base + row);
}
