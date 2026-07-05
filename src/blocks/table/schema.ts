export interface TableCell {
  /** The cell's initial/label content, always shown. */
  value: string;
  /** When true, a student can type into this cell; the correct value is `value`. */
  editableByStudent: boolean;
}

export interface TableData {
  caption: string;
  columnHeaders: string[];
  /** Each row is an array of cells, one per column. */
  rows: TableCell[][];
}

/** A student's response: their typed text for each editable cell, keyed by "row-col". */
export type TableResponse = Record<string, string>;

function isCell(value: unknown): value is TableCell {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Record<string, unknown>;
  return typeof c.value === "string" && typeof c.editableByStudent === "boolean";
}

export function isTableData(value: unknown): value is TableData {
  if (typeof value !== "object" || value === null) return false;
  const d = value as Record<string, unknown>;
  return (
    typeof d.caption === "string" &&
    Array.isArray(d.columnHeaders) &&
    d.columnHeaders.every((h) => typeof h === "string") &&
    Array.isArray(d.rows) &&
    d.rows.every((row) => Array.isArray(row) && row.every(isCell))
  );
}

export function createDefaultTableData(): TableData {
  return {
    caption: "",
    columnHeaders: ["Column 1", "Column 2"],
    rows: [
      [
        { value: "", editableByStudent: false },
        { value: "", editableByStudent: true },
      ],
    ],
  };
}

/** Builds the response key for a given row/column position. */
export function tableCellKey(row: number, col: number): string {
  return `${row}-${col}`;
}
