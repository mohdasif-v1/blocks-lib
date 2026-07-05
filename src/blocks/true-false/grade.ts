import type { GradeResult } from "../../types";
import type { TrueFalseData, TrueFalseResponse } from "./schema";

/** Grades a true/false response: full credit or none, there's no partial credit for one boolean. */
export function grade(
  data: TrueFalseData,
  response: TrueFalseResponse | undefined
): GradeResult {
  if (response === undefined) {
    return { score: 0, correct: false, feedback: "No answer was selected." };
  }
  const isCorrect = response === data.correctAnswer;
  return {
    score: isCorrect ? 1 : 0,
    correct: isCorrect,
    feedback: isCorrect ? "Correct." : `The correct answer is "${data.correctAnswer ? "True" : "False"}".`,
  };
}
