export interface TrueFalseData {
  statement: string;
  correctAnswer: boolean;
}

/** A student's response: their guess at whether the statement is true. */
export type TrueFalseResponse = boolean;

export function isTrueFalseData(value: unknown): value is TrueFalseData {
  if (typeof value !== "object" || value === null) return false;
  const d = value as Record<string, unknown>;
  return typeof d.statement === "string" && typeof d.correctAnswer === "boolean";
}

export function createDefaultTrueFalseData(): TrueFalseData {
  return { statement: "", correctAnswer: true };
}
