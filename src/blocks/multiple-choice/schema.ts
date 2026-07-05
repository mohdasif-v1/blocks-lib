/** A single answer option in a multiple choice block. */
export interface MultipleChoiceOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface MultipleChoiceData {
  prompt: string;
  options: MultipleChoiceOption[];
  /** When false, a student may select more than one option (checkboxes). */
  singleAnswer: boolean;
}

/** A student's response: the ids of the option(s) they selected. */
export type MultipleChoiceResponse = string[];

function isOption(value: unknown): value is MultipleChoiceOption {
  if (typeof value !== "object" || value === null) return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.text === "string" &&
    typeof o.correct === "boolean"
  );
}

export function isMultipleChoiceData(value: unknown): value is MultipleChoiceData {
  if (typeof value !== "object" || value === null) return false;
  const d = value as Record<string, unknown>;
  return (
    typeof d.prompt === "string" &&
    typeof d.singleAnswer === "boolean" &&
    Array.isArray(d.options) &&
    d.options.every(isOption)
  );
}

export function createDefaultMultipleChoiceData(): MultipleChoiceData {
  return {
    prompt: "",
    singleAnswer: true,
    options: [
      { id: "opt-1", text: "", correct: true },
      { id: "opt-2", text: "", correct: false },
    ],
  };
}
