import { put, get } from '@vercel/blob';

const BLOB_PATHNAME = 'analytics/events.csv';
export const CSV_HEADER = 'timestamp,event_type,details,page\n';

export async function readCSV(): Promise<string> {
  try {
    const result = await get(BLOB_PATHNAME, { access: 'private' });
    if (!result || !result.stream) return CSV_HEADER;
    return await new Response(result.stream).text();
  } catch {
    return CSV_HEADER;
  }
}

export async function writeCSV(content: string): Promise<void> {
  await put(BLOB_PATHNAME, content, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'text/csv',
  });
}

export async function appendCSVRow(row: string): Promise<void> {
  const current = await readCSV();
  const base = current.endsWith('\n') ? current : current + '\n';
  await writeCSV(base + row);
}
