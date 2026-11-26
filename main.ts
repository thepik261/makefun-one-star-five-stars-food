// One-star, five-stars food review: a single sentence, written to disk.
//
// The program takes no arguments. It resolves the destination folder
// from the environment, validates the review text, then writes it out
// as the only content of entry.txt.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const review =
  "One star: the locals queue for hours to stare at glowing rectangles, but the noodles — oh, the noodles — were worth crossing the galaxy for.";

// Upper bound from the task rules: the review stays a one-liner.
const MAX_REVIEW_CHARS = 200;

function fail(reason: string): never {
  console.error(`error: ${reason}`);
  process.exit(1);
}

function destinationFolder(): string {
  const fromEnv = process.env.OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.length > 0) {
    return fromEnv;
  }
  return "/output";
}

function guardText(value: string): void {
  if (value.length < 1 || value.length > MAX_REVIEW_CHARS) {
    fail(`review must be between 1 and ${MAX_REVIEW_CHARS} characters long`);
  }
  if (value.trim().length === 0) {
    fail("review must not be only whitespace");
  }
  if (value.includes("\n") || value.includes("\r")) {
    fail("review must not contain a newline character");
  }
}

function main(): void {
  guardText(review);
  const folder = destinationFolder();
  mkdirSync(folder, { recursive: true });
  const target = join(folder, "entry.txt");
  writeFileSync(target, review + "\n", "utf8");
  chmodSync(target, 0o644);
}

main();
