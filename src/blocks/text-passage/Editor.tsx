import React from "react";
import type { BlockEditorProps } from "../../types";
import type { TextPassageData } from "./schema";

/**
 * Editor UI for a text passage block: a plain textarea for markdown or
 * plain-text content. There's no answer key to configure since this
 * block is never graded.
 */
export function Editor({ data, onChange }: BlockEditorProps<TextPassageData>) {
  return (
    <div className="el-block-editor el-block-editor--text-passage">
      <label className="el-field">
        <span className="el-field__label">Passage text</span>
        <textarea
          className="el-input el-textarea el-textarea--tall"
          value={data.content}
          placeholder="Write or paste the passage here. Markdown is supported (headings, bold, lists, links)."
          onChange={(e) => onChange({ content: e.target.value })}
        />
      </label>
    </div>
  );
}
