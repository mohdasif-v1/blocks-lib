import React from "react";
import type { BlockEditorProps } from "../../types";
import type { ShortAnswerData } from "./schema";

/**
 * Minimal working shell for the short-answer Editor. A teacher can write
 * the prompt and toggle case sensitivity, but there's no UI yet for
 * managing the keyword list used as an auto-grading hint.
 *
 * TODO(good first issue): add keyword management. Concretely:
 * 1. Render `data.keywords` as a removable tag list (reuse the
 *    add/remove-row pattern from ../multiple-choice/Editor.tsx).
 * 2. Add a text input plus "Add keyword" button that appends a trimmed,
 *    non-empty keyword to `data.keywords` (dedupe case-insensitively).
 * 3. Add a short help line clarifying that keywords are a grading hint,
 *    not a strict answer key, since short answers usually need a human
 *    to review them.
 * 4. Add ARIA labels for each keyword's remove button.
 */
export function Editor({ data, onChange }: BlockEditorProps<ShortAnswerData>) {
  return (
    <div className="el-block-editor el-block-editor--short-answer">
      <label className="el-field">
        <span className="el-field__label">Question</span>
        <textarea
          className="el-input el-textarea"
          value={data.prompt}
          placeholder="Type the question students will answer in their own words"
          onChange={(e) => onChange({ ...data, prompt: e.target.value })}
        />
      </label>

      <label className="el-field el-field--inline">
        <input
          type="checkbox"
          className="el-checkbox"
          checked={data.caseSensitive}
          onChange={(e) => onChange({ ...data, caseSensitive: e.target.checked })}
        />
        <span>Case sensitive keyword matching</span>
      </label>

      <p className="el-field__hint">
        Keyword hints ({data.keywords.length} set) can't be edited here yet.
        See the TODO at the top of this file if you'd like to pick it up.
      </p>
    </div>
  );
}
