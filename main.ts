// main.ts — hands this site in for the make.fun national statistics bounty.
//
// The site is plain static files under app/ (index.html plus its own CSS
// and ES modules, no build step, nothing fetched from the network). This
// program copies app/ and screenshots/ into the output directory and
// writes dossier.json with the kit's vendored library, exactly as the
// gate re-derives it. Runs on Node 22 with the standard library only.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function copyTree(from, to) {
  if (!existsSync(from)) return;
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
}

mkdirSync(outputDir, { recursive: true });
copyTree(join(repoRoot, 'app'), join(outputDir, 'app'));
copyTree(join(repoRoot, 'screenshots'), join(outputDir, 'screenshots'));

// Caps from the gate: app/ at most 993 entries / 16 MiB, screenshots at
// most 4 files of 256 KiB each, dossier text at most 160 KiB.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
const dossierPath = join(outputDir, 'dossier.json');
writeFileSync(dossierPath, dossier);
console.log(`wrote ${dossierPath} (${statSync(dossierPath).size} bytes)`);
