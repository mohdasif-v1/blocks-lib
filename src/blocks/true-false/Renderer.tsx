import React from "react";
import type { BlockRendererProps } from "../../types";
import type { TrueFalseData, TrueFalseResponse } from "./schema";

/**
 * Renders a true/false block as two radio options. In "review" mode the
 * inputs are disabled and the correct/incorrect choice is highlighted.
 * In "print" mode, just two labeled circles with no interactivity.
 */
export function Renderer({
  data,
  mode,
  response,
  onRespond,
}: BlockRendererProps<TrueFalseData, TrueFalseResponse>) {
  const options: Array<{ value: boolean; label: string }> = [
    { value: true, label: "True" },
    { value: false, label: "False" },
  ];

  return (
    <div className="el-block el-block--true-false">
      <p className="el-block__prompt">{data.statement}</p>
      <ul className="el-block__options" role="list">
        {options.map((option) => {
          const isSelected = response === option.value;
          const reviewClass =
            mode === "review"
              ? isSelected && option.value === data.correctAnswer
                ? "el-block__option--correct"
                : isSelected && option.value !== data.correctAnswer
                ? "el-block__option--incorrect"
                : !isSelected && option.value === data.correctAnswer
                ? "el-block__option--missed"
                : ""
              : "";

          if (mode === "print") {
            return (
              <li key={option.label} className="el-block__option">
                <span className="el-block__option-marker" aria-hidden="true">○</span>
                <span>{option.label}</span>
              </li>
            );
          }

          return (
            <li key={option.label} className={`el-block__option ${reviewClass}`}>
              <label className="el-block__option-label">
                <input
                  type="radio"
                  name={`tf-${data.statement}`}
                  checked={isSelected}
                  disabled={mode === "review"}
                  onChange={() => onRespond?.(option.value)}
                  aria-label={option.label}
                />
                <span>{option.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
