// Blog posts converted from the WordPress export: one HTML file each, metadata in a leading comment.
const files = import.meta.glob<string>('../content/blog/*.html', { query: '?raw', import: 'default', eager: true });

export interface Post { slug: string; title: string; date: string; description: string; categories: string[]; image: string | null; html: string }

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const [, meta, html] = raw.match(/^<!--(.*?)-->\n([\s\S]*)$/)!;
    return { slug: path.split('/').pop()!.replace(/\.html$/, ''), html, ...JSON.parse(meta) };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const excerpt = (html: string, n = 155) => {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > n ? `${text.slice(0, text.lastIndexOf(' ', n))}…` : text;
};
