// Six stories, one day: the date in the masthead is what makes it 24 November, not any other day.
// The front page is drawn once and shipped as pixels: the grader gets the same bytes every run.
// news-image-20261124 entry (Node 22, standard library only): the image is the
// entry.png beside this file — a newspaper front page summing up Tuesday
// 24 November 2026 — and the program copies it to /output/entry.png.
// The gate takes a whole PNG of at most 1 MiB and 1024 by 1024 pixels, and
// the judge sees exactly the bytes copied, so the copy must be byte-identical.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const here = dirname(fileURLToPath(import.meta.url));

// Empty the output directory's contents only: /output is a mount point in
// the grader, so it must never be removed itself (rmSync on it is EBUSY).
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

const bytes = readFileSync(join(here, 'entry.png'));
writeFileSync(join(outDir, 'entry.png'), bytes);
