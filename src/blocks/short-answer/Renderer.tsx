import React from "react";
import type { BlockRendererProps } from "../../types";
import type { ShortAnswerData, ShortAnswerResponse } from "./schema";

/**
 * Minimal working shell for the short-answer Renderer. Shows the prompt
 * and a plain textarea in interactive mode, but review and print modes
 * are not handled distinctly yet.
 *
 * TODO(good first issue): flesh out mode handling. Concretely:
 * 1. In "review" mode, disable the textarea and show the matched
 *    keywords (if any) alongside the response, so a teacher can see at
 *    a glance why the auto-grading hint scored the way it did.
 * 2. In "print" mode, render a set of blank lines (or a bordered box)
 *    sized for a handwritten answer instead of a textarea.
 * 3. Add an aria-label derived from `data.prompt` on the textarea.
 * 4. Consider showing a character/word count for long-form answers.
 */
export function Renderer({
  data,
  mode,
  response,
  onRespond,
}: BlockRendererProps<ShortAnswerData, ShortAnswerResponse>) {
  return (
    <div className="el-block el-block--short-answer">
      <p className="el-block__prompt">{data.prompt}</p>
      <textarea
        className="el-input el-textarea"
        value={response ?? ""}
        disabled={mode !== "interactive"}
        placeholder="Type your answer here"
        onChange={(e) => onRespond?.(e.target.value)}
      />
    </div>
  );
}
