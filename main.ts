// The Funniest Office Joke — entry program.
//
// The entry is a single line. Rather than hard-coding one string literal,
// the joke is assembled from its three comic beats — the setup, the
// escalation, and the punchline — so the shape of the joke (setup, turn,
// punchline last) is visible in the code itself. The assembled line is
// validated against the gate (1..200 UTF-8 characters, not only
// whitespace) and written to /output/entry.txt. Fully deterministic:
// no randomness, no clock, no I/O besides the single output write.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// --- The joke, beat by beat ---------------------------------------------
//
// Setup: a reasonable request, sent the wrong way.
// Escalation: the office does exactly the thing it was asked to stop.
// Punchline: the agreement itself is the offence, and it arrives last.
const BEATS: string[] = [
  "I sent a reply-all asking everyone to stop hitting reply-all,",
  "and forty-seven people replied-all",
  "to agree.",
];

const ENTRY: string = BEATS.join(" ");

// --- Gate: the same limits the sealed scorer enforces --------------------
const MAX_CHARS = 200;

function gate(text: string): void {
  if (BEATS.some((beat) => beat.trim().length === 0)) {
    throw new Error("a joke beat is empty");
  }
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry is ${text.length} characters, gate wants 1..${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (text.split("\n").length !== 1) {
    throw new Error("entry must be a single line");
  }
}

// --- Output ----------------------------------------------------------------
// The grader runs with /output mounted writable; OUTPUT_DIR only exists so
// the entry can be exercised locally without touching the shared /output.
const OUT_PATH = `${process.env.OUTPUT_DIR ?? "/output"}/entry.txt`;

gate(ENTRY);
mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");
