import type { BlockDefinition } from "../../types";
import {
  isTableData,
  createDefaultTableData,
  type TableData,
  type TableResponse,
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
export const tableBlock: BlockDefinition<TableData, TableResponse> = {
  id: "table",
  label: "Table",
  description: "A grid of rows and columns, with some cells fillable by students.",
  isValidData: isTableData,
  createDefaultData: createDefaultTableData,
  Editor,
  Renderer,
  grade,
};
