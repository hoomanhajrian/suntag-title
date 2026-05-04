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

// ─── Archives ────────────────────────────────────────────────────────────────

const ARCHIVE_PREFIX = 'analytics/reports/';

export interface ArchiveInfo {
  id: string;        // YYYY-MM-DD_HH-MM-SS created timestamp
  label: string;     // display name, e.g. ST&T_REPORT_2026-05-04_14-30-22
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  createdAt: Date;
  url: string;
  pathname: string;
}

function extractDateRange(csv: string): { startDate: string; endDate: string } {
  const lines = csv.trim().split('\n').slice(1).filter(Boolean);
  if (lines.length === 0) return { startDate: '', endDate: '' };
  let min = Infinity;
  let max = -Infinity;
  for (const line of lines) {
    const ts = line.split(',')[0];
    const t = new Date(ts).getTime();
    if (!isNaN(t)) {
      if (t < min) min = t;
      if (t > max) max = t;
    }
  }
  if (!isFinite(min)) return { startDate: '', endDate: '' };
  const fmt = (t: number) => new Date(t).toISOString().slice(0, 10);
  return { startDate: fmt(min), endDate: fmt(max) };
}

function formatTimestamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join('-') + '_' + [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join('-');
}

export async function archiveCurrentCSV(content: string): Promise<void> {
  const dataLines = content.trim().split('\n').slice(1).filter(Boolean);
  if (dataLines.length === 0) return;
  const { startDate, endDate } = extractDateRange(content);
  const created = formatTimestamp(new Date());
  // Filename: ST&T_REPORT_[created]__[startDate]__[endDate].csv
  // The __startDate__endDate suffix is for internal parsing only.
  const name = `ST&T_REPORT_${created}__${startDate}__${endDate}.csv`;
  await put(`${ARCHIVE_PREFIX}${name}`, content, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: false,
    contentType: 'text/csv',
  });
}

export async function listArchives(): Promise<ArchiveInfo[]> {
  const { blobs } = await list({ prefix: ARCHIVE_PREFIX });
  return blobs
    .map((b) => {
      const name = b.pathname.replace(ARCHIVE_PREFIX, '').replace('.csv', '');
      // Format: ST&T_REPORT_[created]__[startDate]__[endDate]
      const match = name.match(/^ST&T_REPORT_(.+?)__(.+?)__(.+)$/);
      const created = match?.[1] ?? '';
      return {
        id: created,
        label: `ST&T_REPORT_${created}`,
        startDate: match?.[2] ?? '',
        endDate: match?.[3] ?? '',
        createdAt: b.uploadedAt,
        url: b.url,
        pathname: b.pathname,
      };
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function readArchiveById(id: string): Promise<string | null> {
  const archives = await listArchives();
  const archive = archives.find((a) => a.id === id);
  if (!archive) return null;
  const result = await get(archive.pathname, { access: 'private' });
  if (!result?.stream) return null;
  return await new Response(result.stream).text();
}

export async function deleteArchiveById(id: string): Promise<boolean> {
  const archives = await listArchives();
  const archive = archives.find((a) => a.id === id);
  if (!archive) return false;
  await del([archive.url]);
  return true;
}
