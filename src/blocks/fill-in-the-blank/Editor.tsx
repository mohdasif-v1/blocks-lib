import React from "react";
import type { BlockEditorProps } from "../../types";
import type { FillInTheBlankData } from "./schema";

/**
 * Minimal working shell for the fill-in-the-blank Editor. A teacher can
 * type the passage text (with {{tokens}} for blanks) and toggle case
 * sensitivity, but there's no UI yet for managing each blank's accepted
 * answers, so this is intentionally incomplete.
 *
 * TODO(good first issue): build a proper editor for `data.blanks`.
 * Concretely:
 * 1. Call `extractBlankTokens(data.text)` (see ./schema.ts) whenever the
 *    text changes, and reconcile `data.blanks` with the tokens found:
 *    add a new empty-answers slot for any new token, and drop slots
 *    whose token no longer appears in the text.
 * 2. Render one row per blank (in token order) with a label showing the
 *    token name and an input (or tag-list input) for `acceptedAnswers`,
 *    letting the teacher add/remove accepted answers per blank.
 * 3. Validate that every token in the text has at least one accepted
 *    answer before this block is considered "complete" (surface this
 *    with a small warning, host apps may want to block saving otherwise).
 * 4. Add keyboard-friendly add/remove controls and ARIA labels, matching
 *    the patterns in ../multiple-choice/Editor.tsx.
 */
export function Editor({ data, onChange }: BlockEditorProps<FillInTheBlankData>) {
  return (
    <div className="el-block-editor el-block-editor--fill-in-the-blank">
      <label className="el-field">
        <span className="el-field__label">Passage text</span>
        <textarea
          className="el-input el-textarea"
          value={data.text}
          placeholder="Use {{token}} to mark a blank, e.g. The capital of France is {{capital}}."
          onChange={(e) => onChange({ ...data, text: e.target.value })}
        />
      </label>

      <label className="el-field el-field--inline">
        <input
          type="checkbox"
          className="el-checkbox"
          checked={data.caseSensitive}
          onChange={(e) => onChange({ ...data, caseSensitive: e.target.checked })}
        />
        <span>Case sensitive grading</span>
      </label>

      <p className="el-field__hint">
        Accepted-answer editing per blank is not built yet. See the TODO
        at the top of this file if you'd like to pick it up.
      </p>
    </div>
  );
}
