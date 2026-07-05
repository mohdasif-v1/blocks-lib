export interface ShortAnswerData {
  prompt: string;
  /**
   * Optional keywords used for a rough auto-grading hint. This is not a
   * full answer key, teachers are expected to review short answers
   * themselves; keywords just flag likely-correct responses.
   */
  keywords: string[];
  caseSensitive: boolean;
}

/** A student's response: their free-text answer. */
export type ShortAnswerResponse = string;

export function isShortAnswerData(value: unknown): value is ShortAnswerData {
  if (typeof value !== "object" || value === null) return false;
  const d = value as Record<string, unknown>;
  return (
    typeof d.prompt === "string" &&
    typeof d.caseSensitive === "boolean" &&
    Array.isArray(d.keywords) &&
    d.keywords.every((k) => typeof k === "string")
  );
}

export function createDefaultShortAnswerData(): ShortAnswerData {
  return { prompt: "", keywords: [], caseSensitive: false };
}
