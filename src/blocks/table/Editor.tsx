import React from "react";
import type { BlockEditorProps } from "../../types";
import type { TableData } from "./schema";

/**
 * Minimal working shell for the table Editor. A teacher can set the
 * caption and edit each cell's text, but there's no UI yet for adding or
 * removing rows/columns, or for toggling which cells students can edit.
 *
 * TODO(good first issue): build out row/column management. Concretely:
 * 1. Add "Add row" / "Add column" buttons that append a row of empty,
 *    non-editable cells, or a new column header plus a matching cell in
 *    every existing row.
 * 2. Add remove-row / remove-column controls (keep at least one row and
 *    one column, same guard pattern as
 *    ../multiple-choice/Editor.tsx's removeOption).
 * 3. Add a per-cell toggle for `editableByStudent` (a small checkbox or
 *    icon button in each cell), so a teacher can mark which cells
 *    students fill in.
 * 4. Add column header editing (currently only cell values are editable).
 * 5. Add ARIA labels identifying each input by row/column position.
 */
export function Editor({ data, onChange }: BlockEditorProps<TableData>) {
  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const rows = data.rows.map((row, r) =>
      r !== rowIndex ? row : row.map((cell, c) => (c !== colIndex ? cell : { ...cell, value }))
    );
    onChange({ ...data, rows });
  };

  return (
    <div className="el-block-editor el-block-editor--table">
      <label className="el-field">
        <span className="el-field__label">Caption</span>
        <input
          type="text"
          className="el-input"
          value={data.caption}
          placeholder="Describe what this table shows"
          onChange={(e) => onChange({ ...data, caption: e.target.value })}
        />
      </label>

      <table className="el-table-editor">
        <thead>
          <tr>
            {data.columnHeaders.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    className="el-input"
                    value={cell.value}
                    aria-label={`Row ${rowIndex + 1}, column ${colIndex + 1}`}
                    onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="el-field__hint">
        Adding/removing rows and columns, editing headers, and marking
        cells as student-editable aren't built yet. See the TODO at the
        top of this file if you'd like to pick it up.
      </p>
    </div>
  );
}
