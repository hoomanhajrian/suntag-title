import { put, get, list, del } from '@vercel/blob';

const BLOB_PREFIX = 'analytics/tracking';
export const CSV_HEADER = 'timestamp,event_type,details,location\n';

async function getCurrentPathname(): Promise<string | null> {
  const { blobs } = await list({ prefix: BLOB_PREFIX });
  if (blobs.length === 0) return null;
  blobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  return blobs[0].pathname;
}

async function putBlob(pathname: string, content: string, overwrite: boolean): Promise<void> {
  await put(pathname, content, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: overwrite,
    contentType: 'text/csv',
  });
}

export async function readCSV(): Promise<string> {
  try {
    const pathname = await getCurrentPathname();
    if (!pathname) return CSV_HEADER;
    const result = await get(pathname, { access: 'private' });
    if (!result || !result.stream) return CSV_HEADER;
    return await new Response(result.stream).text();
  } catch {
    return CSV_HEADER;
  }
}

export async function writeCSV(content: string): Promise<void> {
  const { blobs } = await list({ prefix: BLOB_PREFIX });
  if (blobs.length > 0) {
    await del(blobs.map((b) => b.url));
  }
  await putBlob(`${BLOB_PREFIX}${Date.now()}.csv`, content, false);
}

export async function appendCSVRow(row: string): Promise<void> {
  const pathname = await getCurrentPathname();
  if (!pathname) {
    await putBlob(`${BLOB_PREFIX}${Date.now()}.csv`, CSV_HEADER + row, false);
    return;
  }
  const result = await get(pathname, { access: 'private' });
  const current = result?.stream
    ? await new Response(result.stream).text()
    : CSV_HEADER;
  const base = current.endsWith('\n') ? current : current + '\n';
  await putBlob(pathname, base + row, true);
}
