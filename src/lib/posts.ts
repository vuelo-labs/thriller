import tagMap from '../../content/tags.json';

export type PostMeta = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  canonical: string;
  tags: string[];
};

export type Post = PostMeta & { body: string };

const files = import.meta.glob('../../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function unquote(v: string): string {
  const t = v.trim();
  if (t.startsWith('"') && t.endsWith('"')) {
    try {
      return JSON.parse(t);
    } catch {
      return t.slice(1, -1);
    }
  }
  return t;
}

function parse(raw: string): Post {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) {
    return { slug: '', title: '', subtitle: '', date: '', canonical: '', tags: [], body: raw };
  }
  const fm: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = unquote(kv[2]);
  }
  const slug = fm.slug ?? '';
  return {
    slug,
    title: fm.title ?? '',
    subtitle: fm.subtitle ?? '',
    date: fm.date ?? '',
    canonical: fm.canonical ?? '',
    tags: (tagMap as Record<string, string[]>)[slug] ?? [],
    body: m[2],
  };
}

const all: Post[] = Object.values(files)
  .map(parse)
  .sort((a, b) => b.date.localeCompare(a.date));

export function allPosts(): Post[] {
  return all;
}

export function getPost(slug: string): Post | undefined {
  return all.find((p) => p.slug === slug);
}

export function allTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of all) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function relatedPosts(slug: string, limit = 3): Post[] {
  const current = getPost(slug);
  if (!current) return [];
  const others = all.filter((p) => p.slug !== slug);
  const scored = others.map((p) => {
    const overlap = p.tags.filter((t) => current.tags.includes(t)).length;
    return { post: p, score: overlap };
  });
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // Fallback: pick chronologically closest
    const da = Math.abs(new Date(a.post.date).getTime() - new Date(current.date).getTime());
    const db = Math.abs(new Date(b.post.date).getTime() - new Date(current.date).getTime());
    return da - db;
  });
  return scored.slice(0, limit).map((x) => x.post);
}
