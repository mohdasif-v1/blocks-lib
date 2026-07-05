import type { GradeResult } from "../../types";
import type { MultipleChoiceData, MultipleChoiceResponse } from "./schema";

/**
 * Grades a multiple choice response.
 *
 * Single-answer: full credit if the one selected option is correct,
 * otherwise zero.
 *
 * Multi-select: partial credit based on the fraction of correct options
 * chosen, penalized for incorrect options chosen, floored at 0. This
 * rewards students for identifying some but not all correct options
 * while still discouraging "select everything."
 */
export function grade(
  data: MultipleChoiceData,
  response: MultipleChoiceResponse | undefined
): GradeResult {
  const selected = response ?? [];
  const correctIds = new Set(data.options.filter((o) => o.correct).map((o) => o.id));
  const totalCorrect = correctIds.size;

  if (selected.length === 0) {
    return { score: 0, correct: false, feedback: "No answer was selected." };
  }

  if (data.singleAnswer) {
    const isCorrect = selected.length === 1 && correctIds.has(selected[0]);
    return {
      score: isCorrect ? 1 : 0,
      correct: isCorrect,
      feedback: isCorrect ? "Correct." : "That option is not correct.",
    };
  }

  if (totalCorrect === 0) {
    // Malformed answer key: nothing marked correct. Treat as ungraded full credit
    // rather than silently failing every student.
    return { score: 1, correct: true, feedback: "This question has no answer key set." };
  }

  const correctSelected = selected.filter((id) => correctIds.has(id)).length;
  const incorrectSelected = selected.length - correctSelected;
  const rawScore = (correctSelected - incorrectSelected) / totalCorrect;
  const score = Math.max(0, Math.min(1, rawScore));
  const isFullyCorrect =
    correctSelected === totalCorrect && incorrectSelected === 0;

  return {
    score,
    correct: isFullyCorrect,
    feedback: isFullyCorrect
      ? "Correct."
      : `You selected ${correctSelected} of ${totalCorrect} correct options` +
        (incorrectSelected > 0 ? `, plus ${incorrectSelected} incorrect option(s).` : "."),
  };
}
