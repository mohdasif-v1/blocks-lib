import type { GradeResult } from "../../types";
import type { ShortAnswerData, ShortAnswerResponse } from "./schema";

/**
 * Minimal working shell for short-answer grading. Currently this only
 * checks whether the student answered at all, it does not use
 * `data.keywords` to produce an auto-grading hint.
 *
 * TODO(good first issue): implement the keyword-hint scoring. Concretely:
 * 1. Normalize the response (trim, and lowercase unless
 *    `data.caseSensitive` is true).
 * 2. If `data.keywords` is empty, this block can't be auto-graded at
 *    all, return a score of 0 with feedback saying it needs manual
 *    review (don't claim correctness you can't verify).
 * 3. Otherwise, count how many keywords appear as a substring of the
 *    normalized response and return
 *    `score = matchedKeywords / data.keywords.length` as a hint, but
 *    keep `correct = false` unless every keyword matched, and always
 *    say in the feedback that this is a hint pending teacher review.
 * 4. Treat an empty/whitespace-only response as no match, not an error.
 */
export function grade(
  data: ShortAnswerData,
  response: ShortAnswerResponse | undefined
): GradeResult {
  const answered = (response ?? "").trim().length > 0;
  return {
    score: 0,
    correct: false,
    feedback: answered
      ? "This answer needs manual review (keyword auto-grading is not implemented yet)."
      : "No answer was entered.",
  };
}
