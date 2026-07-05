import React from "react";
import type { BlockRendererProps } from "../../types";
import type { TableData, TableResponse } from "./schema";
import { tableCellKey } from "./schema";

/**
 * Minimal working shell for the table Renderer. Shows a static table
 * where non-editable cells always display their value, and editable
 * cells show a plain text input in interactive mode. Review and print
 * modes are not handled distinctly yet.
 *
 * TODO(good first issue): flesh out mode handling. Concretely:
 * 1. In "review" mode, disable editable-cell inputs and highlight
 *    whether the student's value matches the cell's `value` (correct
 *    answer), reusing the correct/incorrect classes from
 *    ../multiple-choice/Renderer.tsx.
 * 2. In "print" mode, render editable cells as an empty bordered box
 *    instead of an input, so students can write in it by hand.
 * 3. Add a visually-hidden or aria-describedby association between
 *    `data.caption` and the <table> element (a <caption> tag is a good
 *    starting point).
 */
export function Renderer({
  data,
  mode,
  response,
  onRespond,
}: BlockRendererProps<TableData, TableResponse>) {
  const setCell = (row: number, col: number, value: string) => {
    onRespond?.({ ...(response ?? {}), [tableCellKey(row, col)]: value });
  };

  return (
    <div className="el-block el-block--table">
      {data.caption && <p className="el-block__prompt">{data.caption}</p>}
      <table className="el-table">
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
              {row.map((cell, colIndex) => {
                if (!cell.editableByStudent) {
                  return <td key={colIndex}>{cell.value}</td>;
                }
                const key = tableCellKey(rowIndex, colIndex);
                return (
                  <td key={colIndex}>
                    <input
                      type="text"
                      className="el-input"
                      value={response?.[key] ?? ""}
                      disabled={mode !== "interactive"}
                      aria-label={`Row ${rowIndex + 1}, column ${colIndex + 1}`}
                      onChange={(e) => setCell(rowIndex, colIndex, e.target.value)}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
