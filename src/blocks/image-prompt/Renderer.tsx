import React from "react";
import type { BlockRendererProps } from "../../types";
import type { ImagePromptData, ImagePromptResponse } from "./schema";

/**
 * Minimal working shell for the image-prompt Renderer. Shows the image
 * (with alt text) and the question, plus a plain textarea in interactive
 * mode. Review and print modes are not handled distinctly yet.
 *
 * TODO(good first issue): flesh out mode handling. Concretely:
 * 1. In "review" mode, disable the textarea (same pattern as
 *    ../short-answer/Renderer.tsx).
 * 2. In "print" mode, render blank lines instead of a textarea, sized
 *    for a handwritten answer.
 * 3. Handle a broken/missing `imageUrl` gracefully (show a placeholder
 *    box with the alt text instead of a broken image icon).
 * 4. Consider a max-width/responsive sizing class from the
 *    design-system for the image, so it doesn't overflow a narrow
 *    worksheet column.
 */
export function Renderer({
  data,
  mode,
  response,
  onRespond,
}: BlockRendererProps<ImagePromptData, ImagePromptResponse>) {
  return (
    <div className="el-block el-block--image-prompt">
      {data.imageUrl && (
        <img className="el-block__image" src={data.imageUrl} alt={data.imageAlt} />
      )}
      <p className="el-block__prompt">{data.question}</p>
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
