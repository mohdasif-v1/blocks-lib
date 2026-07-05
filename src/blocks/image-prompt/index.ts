import type { BlockDefinition } from "../../types";
import {
  isImagePromptData,
  createDefaultImagePromptData,
  type ImagePromptData,
  type ImagePromptResponse,
} from "./schema";
import { Editor } from "./Editor";
import { Renderer } from "./Renderer";
import { grade } from "./grade";

export * from "./schema";
export { Editor, Renderer, grade };

/**
 * SCAFFOLD: schema is real, but Editor/Renderer/grade are minimal shells
 * with TODOs. See the individual files for exactly what's missing.
 */
export const imagePromptBlock: BlockDefinition<ImagePromptData, ImagePromptResponse> = {
  id: "image-prompt",
  label: "Image prompt",
  description: "An image with a question, answered as free text.",
  isValidData: isImagePromptData,
  createDefaultData: createDefaultImagePromptData,
  Editor,
  Renderer,
  grade,
};
