// Convert Medium export HTML posts -> content/posts/*.md with frontmatter.
// Filters out replies (no subtitle section) and drafts (filename prefix).
// Usage: tsx scripts/import-medium.ts <export-dir>

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import TurndownService from 'turndown';

const exportDir = process.argv[2];
if (!exportDir) {
  console.error('Usage: tsx scripts/import-medium.ts <medium-export-dir>');
  process.exit(1);
}

const postsDir = join(exportDir, 'posts');
const outDir = join(process.cwd(), 'content', 'posts');
mkdirSync(outDir, { recursive: true });

const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '_',
});
// Strip noisy section dividers from Medium's structural <hr>s.
td.addRule('dropDividers', {
  filter: (node) => node.nodeName === 'HR',
  replacement: () => '',
});

function extract(html: string, re: RegExp): string | null {
  const m = html.match(re);
  return m ? m[1] : null;
}

function slugFromCanonical(html: string, fallback: string): string {
  const url = extract(html, /<a [^>]*href="(https:\/\/medium\.com\/[^"]+)"[^>]*class="p-canonical"/);
  if (!url) return fallback;
  const tail = url.split('/').pop() || fallback;
  return tail.replace(/-[a-f0-9]{8,}$/, '');
}

function decodeEntities(s: string): string {
  return s
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

const files = readdirSync(postsDir).filter((f) => f.endsWith('.html'));
let kept = 0;
let skipped = 0;
const index: Array<{ slug: string; title: string; date: string; subtitle: string }> = [];

for (const file of files) {
  if (file.startsWith('draft_')) {
    skipped++;
    continue;
  }
  const html = readFileSync(join(postsDir, file), 'utf8');

  // Replies have no subtitle section.
  const subtitleMatch = html.match(
    /<section data-field="subtitle"[^>]*>([\s\S]*?)<\/section>/,
  );
  if (!subtitleMatch) {
    skipped++;
    continue;
  }

  const title = decodeEntities(
    extract(html, /<h1 class="p-name">([\s\S]*?)<\/h1>/)?.trim() || basename(file),
  );
  const subtitle = decodeEntities(subtitleMatch[1].replace(/<[^>]+>/g, '').trim());
  const dateIso =
    extract(html, /<time class="dt-published" datetime="([^"]+)"/) || '';
  const date = dateIso.slice(0, 10);
  const slug = slugFromCanonical(html, basename(file, '.html'));
  const canonical = extract(html, /<a [^>]*href="(https:\/\/medium\.com\/[^"]+)"[^>]*class="p-canonical"/) || '';

  const bodyMatch = html.match(
    /<section data-field="body"[^>]*>([\s\S]*?)<\/section>\s*<footer/,
  );
  let bodyHtml = bodyMatch ? bodyMatch[1] : '';
  // Strip the leading duplicate H3 title that Medium injects.
  bodyHtml = bodyHtml.replace(
    /<h3[^>]*class="[^"]*graf--title[^"]*"[^>]*>[\s\S]*?<\/h3>/,
    '',
  );

  const md = td.turndown(bodyHtml).trim();

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `subtitle: ${JSON.stringify(subtitle)}`,
    `date: ${date}`,
    `slug: ${slug}`,
    `canonical: ${canonical}`,
    '---',
    '',
    md,
    '',
  ].join('\n');

  writeFileSync(join(outDir, `${slug}.md`), frontmatter);
  index.push({ slug, title, date, subtitle });
  kept++;
}

index.sort((a, b) => b.date.localeCompare(a.date));
writeFileSync(join(outDir, 'index.json'), JSON.stringify(index, null, 2));

console.log(`Imported ${kept} posts, skipped ${skipped} (drafts + replies).`);
console.log(`Output: ${outDir}`);
