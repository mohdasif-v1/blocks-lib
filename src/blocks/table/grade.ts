import type { GradeResult } from "../../types";
import type { TableData, TableResponse } from "./schema";
import { tableCellKey } from "./schema";

/**
 * Minimal working shell for table grading. Currently this only counts
 * how many editable cells were answered at all, it does not compare the
 * student's text against the cell's correct `value`.
 *
 * TODO(good first issue): implement real grading. Concretely:
 * 1. Walk every cell where `editableByStudent` is true, and compare
 *    `response[tableCellKey(row, col)]` (trimmed, case-insensitive by
 *    default) against that cell's `value`.
 * 2. Return `score = correctCells / editableCells` (partial credit),
 *    with `correct = true` only when every editable cell matched.
 * 3. Handle the zero-editable-cells case (nothing to grade, similar to
 *    ../text-passage/grade.ts).
 * 4. Write feedback naming how many cells were correct, e.g.
 *    "3 of 4 cells correct."
 */
export function grade(data: TableData, response: TableResponse | undefined): GradeResult {
  let editableCells = 0;
  let answeredCells = 0;

  data.rows.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!cell.editableByStudent) return;
      editableCells += 1;
      const value = response?.[tableCellKey(rowIndex, colIndex)] ?? "";
      if (value.trim().length > 0) answeredCells += 1;
    });
  });

  if (editableCells === 0) {
    return { score: 1, correct: true, feedback: "This table has no editable cells to grade." };
  }

  return {
    score: 0,
    correct: false,
    feedback:
      `Grading for tables is not implemented yet ` +
      `(${answeredCells} of ${editableCells} editable cells were answered).`,
  };
}
