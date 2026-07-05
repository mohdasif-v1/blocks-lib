import React from "react";
import type { BlockEditorProps } from "../../types";
import type { ImagePromptData } from "./schema";

/**
 * Minimal working shell for the image-prompt Editor. A teacher can set
 * the image URL, alt text, and question as plain text fields, but there
 * is no image upload/preview or validation yet.
 *
 * TODO(good first issue): improve this editor. Concretely:
 * 1. Show a live preview of the image below the URL field (with a
 *    placeholder state when the URL is empty or fails to load).
 * 2. Warn (don't block) when `imageAlt` is empty, since alt text is
 *    required for accessible rendering, see ../../CONTRIBUTING.md.
 * 3. Consider wiring this up to the host app's asset upload flow
 *    instead of a raw URL field, that likely needs a prop for an
 *    upload handler, coordinate with core's maintainers before adding
 *    new props to BlockEditorProps.
 */
export function Editor({ data, onChange }: BlockEditorProps<ImagePromptData>) {
  return (
    <div className="el-block-editor el-block-editor--image-prompt">
      <label className="el-field">
        <span className="el-field__label">Image URL</span>
        <input
          type="text"
          className="el-input"
          value={data.imageUrl}
          placeholder="https://..."
          onChange={(e) => onChange({ ...data, imageUrl: e.target.value })}
        />
      </label>

      <label className="el-field">
        <span className="el-field__label">Image description (alt text)</span>
        <input
          type="text"
          className="el-input"
          value={data.imageAlt}
          placeholder="Describe the image for students using a screen reader"
          onChange={(e) => onChange({ ...data, imageAlt: e.target.value })}
        />
      </label>

      <label className="el-field">
        <span className="el-field__label">Question</span>
        <textarea
          className="el-input el-textarea"
          value={data.question}
          placeholder="What do you want students to answer about this image?"
          onChange={(e) => onChange({ ...data, question: e.target.value })}
        />
      </label>

      <p className="el-field__hint">
        No image preview or upload flow yet. See the TODO at the top of
        this file if you'd like to pick it up.
      </p>
    </div>
  );
}
