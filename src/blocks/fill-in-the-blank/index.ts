import type { BlockDefinition } from "../../types";
import {
  isFillInTheBlankData,
  createDefaultFillInTheBlankData,
  type FillInTheBlankData,
  type FillInTheBlankResponse,
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
export const fillInTheBlankBlock: BlockDefinition<FillInTheBlankData, FillInTheBlankResponse> = {
  id: "fill-in-the-blank",
  label: "Fill in the blank",
  description: "A passage with one or more blanks students fill in with text.",
  isValidData: isFillInTheBlankData,
  createDefaultData: createDefaultFillInTheBlankData,
  Editor,
  Renderer,
  grade,
};
