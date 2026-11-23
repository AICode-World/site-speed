import { build } from './vendor/makefun-site/index.js';
import { clearCaches } from './vendor/makefun-site/lib/text.js';

/**
 * makefun-site 1.0.0 drop-in, optimized.
 * run(input) returns exactly what the reference build() returns, byte for byte.
 * Caches are pure, content-addressed memoization and are cleared per case so
 * nothing is ever carried from one case to the next.
 */
export function run(input) {
  clearCaches();
  return build(input);
}
