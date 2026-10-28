// Open positions come from the public Manatal careers page and are rendered as real HTML at build time,
// so Google can read them (the old site showed them in an iframe it could not index).
import { site } from './site';

export interface Job {
  hash: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  city: string;
  country: string;
  remote: boolean;
  datePosted?: string;
  applyUrl: string;
  sourceUrl: string;
}

interface ApiJob {
  hash: string;
  position_name: string;
  description?: string;
  city?: string;
  state?: string;
  country?: string;
  location_display?: string;
  created_at?: string;
  published_at?: string;
  updated_at?: string;
}

const API = 'https://www.careers-page.com/api/v1.0/c/melza/jobs/';

const slugify = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70);

// Manatal descriptions are written by the team; drop anything executable or inline styling before rendering.
const tidy = (html = '') =>
  html
    .replace(/<(script|style|iframe)[\s\S]*?<\/\1>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\s(style|class)="[^"]*"/gi, '')
    .replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '');

let cache: Promise<Job[]> | undefined;

export function getJobs(): Promise<Job[]> {
  cache ??= load();
  return cache;
}

async function load(): Promise<Job[]> {
  const raw: ApiJob[] = [];
  let next: string | null = API;
  try {
    while (next && raw.length < 500) {
      const res = await fetch(next, { headers: { accept: 'application/json' } });
      if (!res.ok) throw new Error(`Manatal ${res.status}`);
      const page = (await res.json()) as { next: string | null; results: ApiJob[] };
      raw.push(...page.results);
      next = page.next;
    }
  } catch (err) {
    // Without the API the site still builds; the jobs page then links to the careers page instead.
    console.warn(`[jobs] could not load offers: ${(err as Error).message}`);
    return [];
  }
  const seen = new Set<string>();
  return raw.map((j) => {
    let slug = `${slugify(j.position_name)}-${j.hash.toLowerCase()}`;
    while (seen.has(slug)) slug += '-2';
    seen.add(slug);
    const where = j.location_display || [j.city, j.state, j.country].filter(Boolean).join(', ');
    const text = `${j.position_name} ${where} ${j.description ?? ''}`.toLowerCase();
    const city = j.city || (text.includes('barcelona') ? 'Barcelona' : '');
    return {
      hash: j.hash,
      title: j.position_name.trim(),
      slug,
      description: tidy(j.description),
      location: where,
      city,
      country: j.country || (city === 'Barcelona' ? 'ES' : ''),
      remote: /\b(full[\s-]?remote|100% remot|fully remote)\b/.test(text),
      datePosted: (j.published_at || j.created_at || j.updated_at)?.slice(0, 10),
      applyUrl: `${site.careersPage}/job/${j.hash}/apply`,
      sourceUrl: `${site.careersPage}/job/${j.hash}`,
    };
  });
}

export const jobPath = (job: Job) => `/empleos/${job.slug}/`;
