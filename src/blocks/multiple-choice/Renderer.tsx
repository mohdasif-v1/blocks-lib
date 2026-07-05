import React from "react";
import type { BlockRendererProps } from "../../types";
import type { MultipleChoiceData } from "./schema";
import type { MultipleChoiceResponse } from "./schema";

/**
 * Renders a multiple choice block. Radios for single-answer, checkboxes
 * for multi-answer. In "review" mode, options are disabled and correct /
 * incorrect selections are highlighted. In "print" mode, no inputs are
 * rendered at all, just labeled option text.
 */
export function Renderer({
  data,
  mode,
  response,
  onRespond,
}: BlockRendererProps<MultipleChoiceData, MultipleChoiceResponse>) {
  const selected = response ?? [];

  const toggle = (id: string) => {
    if (!onRespond) return;
    if (data.singleAnswer) {
      onRespond([id]);
      return;
    }
    onRespond(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]
    );
  };

  const inputType = data.singleAnswer ? "radio" : "checkbox";

  return (
    <div className="el-block el-block--multiple-choice">
      <p className="el-block__prompt">{data.prompt}</p>
      <ul className="el-block__options" role="list">
        {data.options.map((option) => {
          const isSelected = selected.includes(option.id);
          const reviewClass =
            mode === "review"
              ? isSelected && option.correct
                ? "el-block__option--correct"
                : isSelected && !option.correct
                ? "el-block__option--incorrect"
                : !isSelected && option.correct
                ? "el-block__option--missed"
                : ""
              : "";

          if (mode === "print") {
            return (
              <li key={option.id} className="el-block__option">
                <span className="el-block__option-marker" aria-hidden="true">
                  {data.singleAnswer ? "○" : "☐"}
                </span>
                <span>{option.text}</span>
              </li>
            );
          }

          return (
            <li key={option.id} className={`el-block__option ${reviewClass}`}>
              <label className="el-block__option-label">
                <input
                  type={inputType}
                  name={`mc-${data.prompt}`}
                  checked={isSelected}
                  disabled={mode === "review"}
                  onChange={() => toggle(option.id)}
                  aria-label={option.text}
                />
                <span>{option.text}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
