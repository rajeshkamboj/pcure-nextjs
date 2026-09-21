#!/usr/bin/env node
/**
 * PatientsCure – one-shot typography normaliser.
 *
 * Run from the project root:
 *   node apply-type-scale.mjs --dry     # show what would change
 *   node apply-type-scale.mjs           # apply
 *
 * 1) globals.css: adds an @theme block that raises the two smallest sizes
 *      text-xs 12px -> 13px, text-sm 14px -> 15px   (this alone lifts ~240 usages)
 * 2) src/**\/*.tsx: replaces the tiny arbitrary sizes text-[10px]/[11px]/[13px] with text-xs
 *      => the smallest text on the site becomes 13px
 * 3) src/**\/*.tsx: gives h1/h2/h3 one consistent set of size classes (see TIERS below).
 *      h4 and deliberately small label headings (text-xs / text-sm) are left alone.
 *
 * It only edits class names / one CSS block, is safe to re-run, and prints a report.
 */
import fs from 'node:fs';
import path from 'node:path';

const dry = process.argv.includes('--dry');
const root = process.cwd();
const srcDir = path.join(root, 'src');
const cssPath = path.join(srcDir, 'app', 'globals.css');

if (!fs.existsSync(srcDir) || !fs.existsSync(cssPath)) {
  console.error('Run this from the project root (the folder that contains src/).');
  process.exit(1);
}

/* ------------------------------------------------------------------ TIERS */
// Final scale (px at default browser size):
//   small 13 (text-xs) · body-sm 15 (text-sm) · body 16 (text-base) · lead 18 (text-lg)
//   H3 18 · H2 sub-section 20 · H2 section 24→30 · H1 30→36 · hero display 30→36→48
const H1 = ['text-3xl', 'sm:text-4xl'];
const H1_HERO = ['text-3xl', 'sm:text-4xl', 'lg:text-5xl'];
const H2_SECTION = ['text-2xl', 'sm:text-3xl'];
const H2_SUB = ['text-xl'];
const H3 = ['text-lg'];

const SIZE_TOKEN = /^(?:(?:sm|md|lg|xl|2xl):)?text-(?:base|lg|xl|[2-6]xl)$/;
const bare = (t) => t.replace(/^.*:/, '').replace('text-', '');

const report = { files: new Map(), tiny: 0, headings: 0 };
const note = (file, what) => {
  report.files.set(file, (report.files.get(file) || 0) + 1);
  report[what]++;
};

function normaliseHeadings(text, file) {
  return text.replace(/<(h[123])\b([^<>]*?\bclassName=")([^"]*)(")/g, (m, tag, pre, classes, post) => {
    const tokens = classes.split(/\s+/).filter(Boolean);
    const idx = tokens.flatMap((t, i) => (SIZE_TOKEN.test(t) ? [i] : []));
    if (!idx.length) return m;

    const sizes = idx.map((i) => tokens[i]);
    const all = sizes.map(bare);
    const base = bare(sizes.find((t) => !t.includes(':')) || '');

    let tier;
    if (tag === 'h1') {
      if (all.includes('5xl')) tier = H1_HERO;
      else if (all.some((s) => ['3xl', '4xl', '6xl'].includes(s))) tier = H1;
      else return m; // e.g. a small error-card h1 – leave alone
    } else if (tag === 'h2') {
      if (base === '2xl' || base === '3xl') tier = H2_SECTION;
      else if (['xl', 'lg', 'base'].includes(base)) tier = H2_SUB;
      else return m;
    } else {
      tier = H3;
    }

    const next = [...tokens];
    const first = idx[0];
    const keep = next.filter((_, i) => !idx.includes(i));
    keep.splice(Math.min(first, keep.length), 0, ...tier);
    const out = keep.join(' ');
    if (out === tokens.join(' ')) return m;
    note(file, 'headings');
    return `<${tag}${pre}${out}${post}`;
  });
}

function normaliseTiny(text, file) {
  return text.replace(/((?:[a-z0-9]+:)*)text-\[(?:10|11|13)px\]/g, (_m, prefix) => {
    note(file, 'tiny');
    return `${prefix}text-xs`;
  });
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : e.name.endsWith('.tsx') ? [p] : [];
  });
}

for (const file of walk(srcDir)) {
  const original = fs.readFileSync(file, 'utf8');
  const updated = normaliseHeadings(normaliseTiny(original, file), file);
  if (updated !== original && !dry) fs.writeFileSync(file, updated);
}

/* ------------------------------------------------------------------- CSS */
let cssStatus = 'already present';
const css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('/* type-scale */')) {
  const eol = css.includes('\r\n') ? '\r\n' : '\n';
  const block = [
    '/* type-scale */',
    '@theme {',
    '  /* Smallest text on the site: 13px (was 12px, plus several 10-11px labels) */',
    '  --text-xs: 0.8125rem;',
    '  --text-xs--line-height: 1.5;',
    '  /* Secondary body text: 15px (was 14px) */',
    '  --text-sm: 0.9375rem;',
    '  --text-sm--line-height: 1.55;',
    '}',
    '',
  ].join(eol);
  const marker = '@import "tailwindcss";';
  if (!css.includes(marker)) {
    cssStatus = 'SKIPPED – could not find @import "tailwindcss"; add the @theme block manually';
  } else {
    cssStatus = 'added @theme block';
    if (!dry) fs.writeFileSync(cssPath, css.replace(marker, marker + eol + eol + block));
  }
}

/* ---------------------------------------------------------------- report */
console.log(dry ? '\n[DRY RUN – nothing written]\n' : '\n');
console.log(`globals.css: ${cssStatus}`);
console.log(`tiny sizes (10/11/13px) -> text-xs : ${report.tiny}`);
console.log(`h1/h2/h3 normalised               : ${report.headings}`);
console.log('files touched:');
for (const [f, n] of [...report.files].sort()) console.log(`  ${String(n).padStart(3)}  ${path.relative(root, f)}`);
