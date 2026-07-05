import React from "react";
import type { BlockEditorProps } from "../../types";
import type { MultipleChoiceData, MultipleChoiceOption } from "./schema";

let nextOptionCounter = 0;
function newOptionId(): string {
  nextOptionCounter += 1;
  return `opt-${Date.now()}-${nextOptionCounter}`;
}

/**
 * Editor UI for a multiple choice block. Lets a teacher write the
 * prompt, add/remove/reorder options, mark which option(s) are correct,
 * and toggle between single-answer (radio) and multi-answer (checkbox).
 */
export function Editor({ data, onChange }: BlockEditorProps<MultipleChoiceData>) {
  const updateOption = (id: string, patch: Partial<MultipleChoiceOption>) => {
    onChange({
      ...data,
      options: data.options.map((o) => (o.id === id ? { ...o, ...patch } : o)),
    });
  };

  const setCorrect = (id: string, correct: boolean) => {
    if (data.singleAnswer) {
      // Only one option may be correct at a time in single-answer mode.
      onChange({
        ...data,
        options: data.options.map((o) => ({ ...o, correct: o.id === id })),
      });
    } else {
      updateOption(id, { correct });
    }
  };

  const addOption = () => {
    onChange({
      ...data,
      options: [...data.options, { id: newOptionId(), text: "", correct: false }],
    });
  };

  const removeOption = (id: string) => {
    if (data.options.length <= 2) return; // keep at least two options
    onChange({ ...data, options: data.options.filter((o) => o.id !== id) });
  };

  const moveOption = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= data.options.length) return;
    const options = data.options.slice();
    const [moved] = options.splice(index, 1);
    options.splice(target, 0, moved);
    onChange({ ...data, options });
  };

  return (
    <div className="el-block-editor el-block-editor--multiple-choice">
      <label className="el-field">
        <span className="el-field__label">Question</span>
        <textarea
          className="el-input el-textarea"
          value={data.prompt}
          placeholder="Type the question students will answer"
          onChange={(e) => onChange({ ...data, prompt: e.target.value })}
        />
      </label>

      <label className="el-field el-field--inline">
        <input
          type="checkbox"
          className="el-checkbox"
          checked={!data.singleAnswer}
          onChange={(e) => {
            const singleAnswer = !e.target.checked;
            // Collapse to one correct option when switching back to single-answer.
            const firstCorrectIndex = data.options.findIndex((o) => o.correct);
            onChange({
              ...data,
              singleAnswer,
              options: singleAnswer
                ? data.options.map((o, i) => ({ ...o, correct: i === firstCorrectIndex }))
                : data.options,
            });
          }}
        />
        <span>Allow more than one correct answer</span>
      </label>

      <ul className="el-option-list" aria-label="Answer options">
        {data.options.map((option, index) => (
          <li key={option.id} className="el-option-list__item">
            <input
              type={data.singleAnswer ? "radio" : "checkbox"}
              name="mc-correct"
              className="el-option-list__mark"
              checked={option.correct}
              aria-label={`Mark option ${index + 1} as correct`}
              onChange={(e) => setCorrect(option.id, e.target.checked)}
            />
            <input
              type="text"
              className="el-input el-option-list__text"
              value={option.text}
              placeholder={`Option ${index + 1}`}
              aria-label={`Option ${index + 1} text`}
              onChange={(e) => updateOption(option.id, { text: e.target.value })}
            />
            <button
              type="button"
              className="el-icon-button"
              aria-label={`Move option ${index + 1} up`}
              disabled={index === 0}
              onClick={() => moveOption(index, -1)}
            >
              ↑
            </button>
            <button
              type="button"
              className="el-icon-button"
              aria-label={`Move option ${index + 1} down`}
              disabled={index === data.options.length - 1}
              onClick={() => moveOption(index, 1)}
            >
              ↓
            </button>
            <button
              type="button"
              className="el-icon-button el-icon-button--danger"
              aria-label={`Remove option ${index + 1}`}
              disabled={data.options.length <= 2}
              onClick={() => removeOption(option.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className="el-button el-button--secondary" onClick={addOption}>
        Add option
      </button>
    </div>
  );
}
