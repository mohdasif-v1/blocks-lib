import type { GradeResult } from "../../types";
import type { TextPassageData, TextPassageResponse } from "./schema";

/**
 * A text passage is content, not a question, so there is nothing to
 * grade. This always returns full score so passages don't drag down a
 * worksheet's overall score when a host app sums up block results.
 */
export function grade(
  _data: TextPassageData,
  _response: TextPassageResponse | undefined
): GradeResult {
  return { score: 1, correct: true, feedback: "This block is not graded." };
}
