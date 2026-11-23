// makefun-site's text rules: the HTML escape table, the slug rule and the long date (README.md, "Text").

/** The HTML escape table, in this order: & < > " ' (README.md). */
const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

// Optimized equivalent of `text.replace(/[&<>"']/g, c => ESCAPES[c])`.
// Most text has no escapable char: a scan that finds none returns the input as-is,
// avoiding the regex/closure entirely. When there are hits, join escaped slices.
const ESCAPE_TEST = /[&<>"']/;

const escapeCache = new Map();

export function escapeHtml(text) {
  // Fast path: scan inline with charCode comparisons. Most strings need no
  // escaping at all, so return them untouched without touching the cache.
  let first = -1;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (c === 38 || c === 60 || c === 62 || c === 34 || c === 39) { first = i; break; }
  }
  if (first === -1) return text;

  const hit = escapeCache.get(text);
  if (hit !== undefined) return hit;
  const parts = [];
  let start = 0;
  for (let i = first; i < text.length; i++) {
    const rep = ESCAPES[text[i]];
    if (rep !== undefined) {
      if (i > start) parts.push(text.slice(start, i));
      parts.push(rep);
      start = i + 1;
    }
  }
  if (start < text.length) parts.push(text.slice(start));
  const out = parts.join('');
  escapeCache.set(text, out);
  return out;
}

/** The most characters a slug keeps before a collision suffix. */
export const SLUG_MAX = 64;

/**
 * The slug of `text`: NFKD, combining marks dropped, A-Z lowered, every run of characters other than a-z and 0-9 one
 * "-", none at either end, at most SLUG_MAX characters (a "-" left at the cut dropped), and "untitled" when nothing is
 * left.
 */
const slugCache = new Map();

export function slugify(text) {
  const hit = slugCache.get(text);
  if (hit !== undefined) return hit;
  const plain = text.normalize('NFKD').replace(/\p{M}/gu, '');
  let out = '';
  let gap = false;
  for (const ch of plain) {
    let keep = null;
    if (ch >= 'A' && ch <= 'Z') keep = ch.toLowerCase();
    else if ((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9')) keep = ch;
    if (keep === null) {
      gap = out.length > 0;
      continue;
    }
    if (gap) out += '-';
    gap = false;
    out += keep;
  }
  out = out.slice(0, SLUG_MAX).replace(/-+$/, '');
  out = out === '' ? 'untitled' : out;
  slugCache.set(text, out);
  return out;
}

/** `slug` made unique against `taken` (and added to it): the first of slug, slug-2, slug-3 ... not taken. */
export function uniqueSlug(slug, taken) {
  let out = slug;
  for (let n = 2; taken.has(out); n++) out = `${slug}-${n}`;
  taken.add(out);
  return out;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** A YYYY-MM-DD date in words, from the string alone: "2026-11-09" is "9 November 2026". */
const dateCache = new Map();

export function longDate(date) {
  const hit = dateCache.get(date);
  if (hit !== undefined) return hit;
  const [y, m, d] = date.split('-');
  const out = `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
  dateCache.set(date, out);
  return out;
}

/**
 * Clear all memoization caches. Called at the start of every run(input) so no
 * value is ever cached from one case to the next (required by the rules); the
 * caches only ever dedupe pure, content-addressed computations within a case.
 */
export function clearCaches() {
  escapeCache.clear();
  slugCache.clear();
  dateCache.clear();
}
