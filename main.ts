// One-Line Office Joke — make.fun "One-Line Office Joke: 24-Hour Sprint"
//
// Writes exactly one single-line joke about office life — the sort of line
// you send a colleague after a meeting that should have been an email —
// to /output/entry.txt.
//
// Node 22+, no dependencies, no network access.

import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "That meeting could have been an email, but then we'd have needed a meeting to explain the email — and another meeting to schedule it.";

const OUTPUT_PATH = "/output/entry.txt";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Guard: the joke must be exactly one line, 1-200 characters, with no
// newline or control characters.
if (JOKE.length === 0 || JOKE.length > 200) {
  fail(`joke must be 1-200 characters, got ${JOKE.length}`);
}
if (/[\r\n\x00-\x1F\x7F]/.test(JOKE)) {
  fail("joke must not contain newline or control characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, JOKE, "utf8");
console.log(`wrote ${OUTPUT_PATH}`);
