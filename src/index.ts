import type { BlockDefinition, BlockRegistry } from "./types";
import { multipleChoiceBlock } from "./blocks/multiple-choice";
import { trueFalseBlock } from "./blocks/true-false";
import { fillInTheBlankBlock } from "./blocks/fill-in-the-blank";
import { shortAnswerBlock } from "./blocks/short-answer";
import { imagePromptBlock } from "./blocks/image-prompt";
import { textPassageBlock } from "./blocks/text-passage";
import { tableBlock } from "./blocks/table";

export * from "./types";

/** Every block definition this package ships, in the order shown in the builder's "add block" menu. */
export const blockList: BlockDefinition[] = [
  multipleChoiceBlock,
  trueFalseBlock,
  textPassageBlock,
  fillInTheBlankBlock,
  shortAnswerBlock,
  imagePromptBlock,
  tableBlock,
];

/** The same block definitions, keyed by block id, for O(1) lookup by a host app. */
export const blockRegistry: BlockRegistry = Object.fromEntries(
  blockList.map((block) => [block.id, block])
);

export {
  multipleChoiceBlock,
  trueFalseBlock,
  fillInTheBlankBlock,
  shortAnswerBlock,
  imagePromptBlock,
  textPassageBlock,
  tableBlock,
};
