import type { BlockDefinition } from "../../types";
import {
  isMultipleChoiceData,
  createDefaultMultipleChoiceData,
  type MultipleChoiceData,
  type MultipleChoiceResponse,
} from "./schema";
import { Editor } from "./Editor";
import { Renderer } from "./Renderer";
import { grade } from "./grade";

export * from "./schema";
export { Editor, Renderer, grade };

export const multipleChoiceBlock: BlockDefinition<MultipleChoiceData, MultipleChoiceResponse> = {
  id: "multiple-choice",
  label: "Multiple choice",
  description: "A question with two or more options, one or more of which are correct.",
  isValidData: isMultipleChoiceData,
  createDefaultData: createDefaultMultipleChoiceData,
  Editor,
  Renderer,
  grade,
};
