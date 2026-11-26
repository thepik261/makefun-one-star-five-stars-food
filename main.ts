// One Star, Five Stars for the Food — make.fun bounty entry.
// Writes one sentence (an alien tourist's one-star review of Earth
// that still compliments the food) to /output/entry.txt.
// The sealed gate requires 1-200 UTF-8 characters, not only whitespace;
// pure Node stdlib, deterministic, no network.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace, one sentence, in the voice of an alien tourist
// giving planet Earth a one-star review while complimenting the food.
const MAX_CHARS = 200;

const LINE =
  "One star: the locals queue for hours to stare at glowing rectangles, but the noodles — oh, the noodles — were worth crossing the galaxy for.";

if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(`LINE must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("LINE must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("LINE must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
try {
  chmodSync(outPath, 0o644);
} catch {
  // best-effort: file is already written
}
