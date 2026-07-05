import type { BlockDefinition } from "../../types";
import {
  isTrueFalseData,
  createDefaultTrueFalseData,
  type TrueFalseData,
  type TrueFalseResponse,
} from "./schema";
import { Editor } from "./Editor";
import { Renderer } from "./Renderer";
import { grade } from "./grade";

export * from "./schema";
export { Editor, Renderer, grade };

export const trueFalseBlock: BlockDefinition<TrueFalseData, TrueFalseResponse> = {
  id: "true-false",
  label: "True or false",
  description: "A single statement that students judge as true or false.",
  isValidData: isTrueFalseData,
  createDefaultData: createDefaultTrueFalseData,
  Editor,
  Renderer,
  grade,
};
