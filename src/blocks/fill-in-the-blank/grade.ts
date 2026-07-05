import type { GradeResult } from "../../types";
import type { FillInTheBlankData, FillInTheBlankResponse } from "./schema";

/**
 * Minimal working shell for fill-in-the-blank grading. Currently this
 * only checks that every blank has a non-empty response and does not
 * actually compare it against `acceptedAnswers`, so nothing is graded
 * for correctness yet.
 *
 * TODO(good first issue): implement real grading. Concretely:
 * 1. For each slot in `data.blanks`, look up the student's answer in
 *    `response[slot.id]`.
 * 2. Trim whitespace from both the response and each accepted answer
 *    before comparing (don't penalize stray leading/trailing spaces).
 * 3. Compare case-insensitively unless `data.caseSensitive` is true.
 * 4. Count how many blanks matched any of their `acceptedAnswers` and
 *    return `score = correctBlanks / totalBlanks` (partial credit),
 *    with `correct = true` only when every blank matched.
 * 5. Handle the empty-response case explicitly (missing key or empty
 *    string counts as wrong, not a thrown error).
 * 6. Write feedback that names how many blanks were correct, e.g.
 *    "2 of 3 blanks correct."
 */
export function grade(
  data: FillInTheBlankData,
  response: FillInTheBlankResponse | undefined
): GradeResult {
  const totalBlanks = data.blanks.length;
  if (totalBlanks === 0) {
    return { score: 1, correct: true, feedback: "This block has no blanks to grade." };
  }

  const answeredBlanks = data.blanks.filter(
    (slot) => (response?.[slot.id] ?? "").trim().length > 0
  ).length;

  return {
    score: 0,
    correct: false,
    feedback:
      `Grading for fill-in-the-blank is not implemented yet ` +
      `(${answeredBlanks} of ${totalBlanks} blanks were answered).`,
  };
}
