// One-Line Office Joke — make.fun "One-Line Office Joke: 24-Hour Sprint"
//
// Writes exactly one single-line joke about office life — the sort of line
// you send a colleague after a meeting that should have been an email —
// to /output/entry.txt.
//
// Node 22+, no dependencies, no network access.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "That meeting could have been an email, but then we'd have needed a meeting to explain the email — and another meeting to schedule it.";

const OUTPUT_PATH = "/output/entry.txt";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Count Unicode code points, not UTF-16 code units: the 200-character limit
// is in characters, and an astral-plane character counts as one, not two.
const codePoints = [...JOKE].length;

// Guard: the joke must be exactly one line, 1-200 characters, with no
// newline or control characters.
if (codePoints === 0 || codePoints > 200) {
  fail(`joke must be 1-200 characters, got ${codePoints}`);
}
if (/[\r\n\x00-\x1F\x7F]/.test(JOKE)) {
  fail("joke must not contain newline or control characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, JOKE, "utf8");

// Read-back verification: confirm the file on disk is exactly the joke —
// one line, no trailing newline, no extra bytes.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== JOKE) {
  fail("verification failed: /output/entry.txt does not match the joke");
}
if (written.split("\n").length !== 1) {
  fail("verification failed: /output/entry.txt is not exactly one line");
}

console.log(`wrote ${OUTPUT_PATH} (${codePoints} characters)`);
