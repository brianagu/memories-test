import fs from 'fs';
import path from 'path';

export interface MediaAsset {
  src: string;
  title: string;
  year: string;
  credit?: string;
}

const MEDIA_DIR = path.join(process.cwd(), 'public', 'media');
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm', '.mov'];

/**
 * Parse filename into caption parts
 * Format: [Title]_[Year] or [Title]_[Year]_[CreditLabel]
 * Optional: append -N suffix to filename (e.g., -2, -3) to disambiguate duplicate titles
 * Example: SanFrancisco_2019 or SanFrancisco_2019_ShotFor823Neighbo(u)r or SanFrancisco_2019-2
 * The -N suffix is stripped before parsing, so it never appears in the caption.
 */
function parseFilename(filename: string): { title: string; year: string; credit?: string } | null {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  // Strip manual disambiguator suffix (e.g. "-2", "-3") used to make filenames unique
  // when multiple files share the same Title_Year(_Credit).
  // This is stripped before caption parsing so it never appears in the rendered caption.
  const disambiguated = nameWithoutExt.replace(/-\d+$/, '');
  const match = disambiguated.match(/^(.+?)_(\d{4})(?:_(.+))?$/);

  if (!match) {
    console.warn(`[media] Skipping file with invalid name format: ${filename}`);
    return null;
  }

  const [, title, year, credit] = match;
  return {
    title,
    year,
    ...(credit && { credit }),
  };
}

/**
 * Read all media assets from public/media folder
 * Returns them in filename order (deterministic)
 */
export function getMediaAssets(): MediaAsset[] {
  if (!fs.existsSync(MEDIA_DIR)) {
    console.warn(`[media] Directory does not exist: ${MEDIA_DIR}`);
    return [];
  }

  const files = fs.readdirSync(MEDIA_DIR);
  const assets: MediaAsset[] = [];

  for (const file of files) {
    // Only process image files
    const ext = path.extname(file).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      continue;
    }

    const parsed = parseFilename(file);
    if (!parsed) {
      continue;
    }

    assets.push({
      src: `/media/${file}`,
      title: parsed.title,
      year: parsed.year,
      credit: parsed.credit,
    });
  }

  return assets;
}
