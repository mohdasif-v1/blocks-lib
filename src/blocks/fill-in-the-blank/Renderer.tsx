import React from "react";
import type { BlockRendererProps } from "../../types";
import type { FillInTheBlankData, FillInTheBlankResponse } from "./schema";

/**
 * Minimal working shell for the fill-in-the-blank Renderer. It shows the
 * raw passage text (tokens and all) instead of turning each {{token}}
 * into an actual input or review-highlighted answer, so this is not
 * usable for students yet.
 *
 * TODO(good first issue): replace the raw text output below with a real
 * renderer. Concretely:
 * 1. Split `data.text` on the `{{token}}` pattern (see
 *    `extractBlankTokens` in ./schema.ts for the regex) and render the
 *    surrounding text as plain text with an inline <input> in place of
 *    each token.
 * 2. In "interactive" mode, wire each input's value to
 *    `response?.[token]` and call `onRespond` with the updated response
 *    map on change.
 * 3. In "review" mode, disable the inputs and highlight each blank as
 *    correct or incorrect (reuse the grading logic in ./grade.ts, or
 *    accept a precomputed per-blank result if that's cleaner).
 * 4. In "print" mode, render a blank line or underscore of fixed width
 *    instead of an input.
 * 5. Add an aria-label to each input identifying which blank it is.
 */
export function Renderer({
  data,
}: BlockRendererProps<FillInTheBlankData, FillInTheBlankResponse>) {
  return (
    <div className="el-block el-block--fill-in-the-blank">
      <p className="el-block__prompt">{data.text}</p>
      <p className="el-block__prompt el-block__prompt--empty">
        (fill-in-the-blank inputs are not implemented yet)
      </p>
    </div>
  );
}
