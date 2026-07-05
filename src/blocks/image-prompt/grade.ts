import type { GradeResult } from "../../types";
import type { ImagePromptData, ImagePromptResponse } from "./schema";

/**
 * Minimal working shell for image-prompt grading. Like short answer,
 * this block has no built-in answer key, so grading currently just
 * checks whether the student answered at all.
 *
 * TODO(good first issue): decide and implement a real grading approach.
 * Concretely, this likely needs a schema change first (see
 * ../short-answer/schema.ts for a keyword-hint pattern you could copy),
 * since `ImagePromptData` doesn't currently carry any answer key. Open
 * an issue to discuss the approach before making a breaking schema
 * change, see ../../CONTRIBUTING.md on schema versioning.
 */
export function grade(
  data: ImagePromptData,
  response: ImagePromptResponse | undefined
): GradeResult {
  const answered = (response ?? "").trim().length > 0;
  return {
    score: 0,
    correct: false,
    feedback: answered
      ? "This answer needs manual review (auto-grading is not implemented yet)."
      : "No answer was entered.",
  };
}
