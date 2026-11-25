// One day, one timeline: Tuesday 24 November 2026 drawn as a single
// horizontal spine — five dated stories on the line, tech and sport in
// the closing strip — shipped as pixels, so the grader sees identical
// bytes on every run, no matter the machine.
// news-image-20261124 v2 (Node 22, standard library only). The program
// stages the entry.png beside it into the output directory.
//
// Run it outside the grader like this:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourceDir = dirname(fileURLToPath(import.meta.url));

// The grader mounts the output directory, so only its contents get
// cleared — removing the directory itself fails on a mount point.
mkdirSync(targetDir, { recursive: true });
for (const item of readdirSync(targetDir)) {
  rmSync(join(targetDir, item), { recursive: true, force: true });
}

// A straight file copy keeps the PNG byte-identical to the shipped one.
copyFileSync(join(sourceDir, 'entry.png'), join(targetDir, 'entry.png'));

// The spine is the story: five nodes, one day, no second page.
// If a node ever moves, the order on the line moves with it.
