/**
 * A single blank's accepted answers. `id` must match a `{{blank id}}`
 * token in the passage text, e.g. `{{capital}}`.
 */
export interface FillInTheBlankSlot {
  id: string;
  /** Any of these strings counts as correct (case handled at grading time). */
  acceptedAnswers: string[];
}

export interface FillInTheBlankData {
  /** Passage text containing tokens like "The capital of France is {{capital}}." */
  text: string;
  blanks: FillInTheBlankSlot[];
  caseSensitive: boolean;
}

/** A student's response: their typed text for each blank, keyed by blank id. */
export type FillInTheBlankResponse = Record<string, string>;

function isSlot(value: unknown): value is FillInTheBlankSlot {
  if (typeof value !== "object" || value === null) return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s.id === "string" &&
    Array.isArray(s.acceptedAnswers) &&
    s.acceptedAnswers.every((a) => typeof a === "string")
  );
}

export function isFillInTheBlankData(value: unknown): value is FillInTheBlankData {
  if (typeof value !== "object" || value === null) return false;
  const d = value as Record<string, unknown>;
  return (
    typeof d.text === "string" &&
    typeof d.caseSensitive === "boolean" &&
    Array.isArray(d.blanks) &&
    d.blanks.every(isSlot)
  );
}

export function createDefaultFillInTheBlankData(): FillInTheBlankData {
  return {
    text: "The capital of France is {{capital}}.",
    blanks: [{ id: "capital", acceptedAnswers: ["Paris"] }],
    caseSensitive: false,
  };
}

/** Extracts blank ids in order of appearance, e.g. ["capital"] from "... {{capital}} ...". */
export function extractBlankTokens(text: string): string[] {
  const matches = text.match(/\{\{\s*([^}]+?)\s*\}\}/g) ?? [];
  return matches.map((m) => m.replace(/^\{\{\s*|\s*\}\}$/g, ""));
}
