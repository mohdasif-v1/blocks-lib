import type { BlockDefinition } from "../../types";
import {
  isTextPassageData,
  createDefaultTextPassageData,
  type TextPassageData,
  type TextPassageResponse,
} from "./schema";
import { Editor } from "./Editor";
import { Renderer } from "./Renderer";
import { grade } from "./grade";

export * from "./schema";
export { Editor, Renderer, grade };

export const textPassageBlock: BlockDefinition<TextPassageData, TextPassageResponse> = {
  id: "text-passage",
  label: "Text passage",
  description: "A read-only block of text or markdown content, with no grading.",
  isValidData: isTextPassageData,
  createDefaultData: createDefaultTextPassageData,
  Editor,
  Renderer,
  grade,
};
