# @ensinolibre/blocks

This is EnsinoLibre's reusable teaching-component library: the worksheet "blocks" that the `core` builder app assembles into worksheets. Third parties building their own worksheet tools can install this package directly instead of reinventing multiple choice, fill in the blank, and the rest.

## What a block is

A block is a self-contained package of four things:

1. **Schema** - a plain TypeScript type describing the block's data (e.g. `MultipleChoiceData`), plus a small runtime function like `isMultipleChoiceData()` that checks a value actually has that shape. No heavy validation library, just enough of a guard to catch bad data before it hits a component.
2. **Editor** - a React component used inside the builder so a teacher can configure the block (write the question, add options, mark correct answers, and so on).
3. **Renderer** - a React component that shows the block to a student. It supports three modes: `interactive` (student is answering), `review` (finished response shown with correct/incorrect highlighting), and `print` (static, read-only, for a printed worksheet).
4. **Grading** - a pure function, `grade(data, response)`, that takes the block's data (which carries the answer key) and the student's response, and returns a score from 0 to 1 plus short feedback. Being pure means it can run on a server, in a background worker, or in the browser and always give the same answer.

These four pieces are bundled into a `BlockDefinition` object and registered under a stable id in `src/index.ts`.

## The seven block types

| Block | Description | Status |
|---|---|---|
| `multiple-choice` | One question, two or more options, single or multi-select | Complete |
| `true-false` | One statement, judged true or false | Complete |
| `text-passage` | Read-only text or markdown content, not graded | Complete |
| `fill-in-the-blank` | Passage with `{{token}}` blanks students fill in | Scaffold |
| `short-answer` | Free-text response, optional keyword grading hint | Scaffold |
| `image-prompt` | Image plus a free-text question | Scaffold |
| `table` | Grid of rows/columns, some cells editable by students | Scaffold |

"Scaffold" means the schema is real and usable, but the Editor, Renderer, and/or grade function are minimal shells with a `// TODO(good first issue):` comment spelling out exactly what's missing. This is intentional, not an oversight: these four are good starting points for a first contribution. Check each block's files for the specifics before picking one up.

## Author a new block: a worked walkthrough

Say you want to add an `ordering` block (students drag items into the correct sequence).

1. **Copy an existing folder.** `multiple-choice` is the closest complete example, copy `src/blocks/multiple-choice/` to `src/blocks/ordering/`.
2. **Define your schema** in `schema.ts`. Something like:
   ```ts
   export interface OrderingData {
     prompt: string;
     items: { id: string; text: string }[]; // stored in correct order
   }
   export type OrderingResponse = string[]; // student's ordering, by item id
   ```
   Write `isOrderingData()` as a plain runtime check, and `createDefaultOrderingData()` for a sane starting value.
3. **Build the Editor** (`Editor.tsx`): a form for the prompt and the item list in correct order, with add/remove/reorder controls. Use design-system classes for styling (see below), not hardcoded colors.
4. **Build the Renderer** (`Renderer.tsx`): handle all three modes (`interactive`, `review`, `print`). In interactive mode students can reorder items; in review mode show their submitted order against the correct one; in print mode show a static list.
5. **Write `grade()`** in `grade.ts`: a pure function comparing the student's order to the correct order. Decide on partial credit (e.g. score by how many items are in the right position) and document the reasoning in a comment, the way `multiple-choice/grade.ts` does.
6. **Register it** in `src/index.ts`: import your block's `index.ts`, add it to `blockList`, and it will automatically show up in `blockRegistry`.
7. **Add a test** covering `isOrderingData()` and `grade()` at minimum, those are the two places silent bugs hurt most.

## How `core` and third parties consume this package

```
npm install @ensinolibre/blocks
```

```ts
import { blockRegistry } from '@ensinolibre/blocks';

const multipleChoice = blockRegistry['multiple-choice'];
const { Editor, Renderer, grade } = multipleChoice;
```

`blockRegistry` is a plain object keyed by block id. `blockList` (also exported) is the same set of blocks as an ordered array, useful for building an "add block" menu in a fixed order.

## Styling

Block components should use CSS classes and tokens from [`@ensinolibre/design-system`](https://github.com/ensinolibre/design-system) rather than hardcoded colors or spacing. Class names in this package follow an `el-` prefix (e.g. `el-block`, `el-input`) that the design system is expected to style; if a class you need doesn't exist yet, add it to the design system rather than inlining styles here.

## More resources

- [`core`](https://github.com/ensinolibre/core) - the worksheet builder app that assembles these blocks into worksheets
- [`design-system`](https://github.com/ensinolibre/design-system) - shared CSS classes and tokens used by block components
- [`docs`](https://github.com/ensinolibre/docs) - the fuller block-authoring guide, worth reading before your first PR
- [Get help](https://github.com/orgs/ensinolibre/discussions) - post a question in org discussions if you get stuck
