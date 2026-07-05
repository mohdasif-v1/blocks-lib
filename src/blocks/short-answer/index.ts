import type { BlockDefinition } from "../../types";
import {
  isShortAnswerData,
  createDefaultShortAnswerData,
  type ShortAnswerData,
  type ShortAnswerResponse,
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
export const shortAnswerBlock: BlockDefinition<ShortAnswerData, ShortAnswerResponse> = {
  id: "short-answer",
  label: "Short answer",
  description: "An open-ended question with a free-text response, optionally hinted by keywords.",
  isValidData: isShortAnswerData,
  createDefaultData: createDefaultShortAnswerData,
  Editor,
  Renderer,
  grade,
};
