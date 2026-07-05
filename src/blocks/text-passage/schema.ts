export interface TextPassageData {
  /** Markdown or plain text content shown to students. No grading applies. */
  content: string;
}

/** Text passages are read-only, so there is nothing for a student to submit. */
export type TextPassageResponse = undefined;

export function isTextPassageData(value: unknown): value is TextPassageData {
  if (typeof value !== "object" || value === null) return false;
  const d = value as Record<string, unknown>;
  return typeof d.content === "string";
}

export function createDefaultTextPassageData(): TextPassageData {
  return { content: "" };
}
