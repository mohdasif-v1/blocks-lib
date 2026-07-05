# Contributing to @ensinolibre/blocks

This file covers what's specific to authoring or changing blocks in this repo. For general EnsinoLibre contribution norms (code of conduct, PR process, commit style), see the [org-wide CONTRIBUTING guide](https://github.com/ensinolibre/.github/blob/main/CONTRIBUTING.md).

## Before you open a PR: a block-authoring checklist

### Schema versioning

Worksheets built with an older version of a block's schema are already saved out there, in `core` and in third-party apps. Changing a schema can break them.

- Prefer adding optional fields over changing or removing existing ones.
- If you must change a field's meaning or remove one, write a short migration note in your PR description explaining what data it affects and how a host app should handle old data (a default value, a one-time transform, etc). Don't assume every consumer re-saves every worksheet on load.
- Keep `isXxxData()` guards lenient enough to accept data saved by the previous minor version whenever you can. If a field becomes required, give the guard a sensible fallback instead of just rejecting the old shape outright.
- Never reuse a block `id` for a different schema. If a block type changes shape enough that it's really a new thing, give it a new id.

### Accessibility

- Every interactive element in an Editor must be reachable and operable by keyboard alone: tab order should follow the visual order, and custom controls (reorder buttons, toggles) need a visible focus state.
- Give inputs real labels. A placeholder is not a label, use `<label>`, `aria-label`, or `aria-labelledby` so a screen reader announces what the field is for.
- Any image (see `image-prompt`) needs alt text that describes the image's content, not just "image" or the filename. Empty alt text is only correct when the image is purely decorative, which is rare for a worksheet block.
- In `review` mode, don't rely on color alone to show correct/incorrect. Pair the highlight with a text or icon cue (see how `multiple-choice/Renderer.tsx` and `true-false/Renderer.tsx` combine a CSS class with visible marker text).

### Grading edge cases

Write `grade()` to handle these without throwing or silently mis-scoring:

- **Empty response.** A student who submitted nothing should get a clear "no answer" result, not an exception and not a false "correct" from an empty-equals-empty comparison.
- **Whitespace.** Trim text responses before comparing. A trailing space or accidental newline shouldn't turn a correct answer wrong.
- **Case sensitivity.** Where it's a judgment call (short answer, fill in the blank), make it a schema field (`caseSensitive: boolean`) rather than a hardcoded choice, and default to case-insensitive since that matches how most teachers actually grade.
- **Malformed answer keys.** If a block's data has no correct answer marked at all (an empty options list, no accepted answers), don't fail the student for the block's own bad configuration, see how `multiple-choice/grade.ts` handles a missing answer key.

### Tests

Every block should have tests for:

- The `isXxxData()` guard: at least one valid shape, and a couple of invalid ones (missing field, wrong type).
- `grade()`: a clearly-correct response, a clearly-wrong response, an empty response, and any partial-credit case your grading logic supports.

Scaffolded blocks (`fill-in-the-blank`, `short-answer`, `image-prompt`, `table`) don't need full coverage of the unimplemented parts, but the parts that do exist (schema guards, the "not implemented yet" grading responses) should still be tested so a future PR that implements the TODO doesn't silently break the shell's existing behavior.

## Picking up a scaffold

If you want to implement one of the scaffolded blocks, read the `// TODO(good first issue):` comment at the top of the relevant `Editor.tsx`, `Renderer.tsx`, or `grade.ts` first, it lays out the specific steps expected. Open an issue linking to the file before starting large changes, in case someone's already partway through it.

## Questions

If something in this checklist is unclear for the block you're building, ask before guessing, especially on schema changes and grading semantics. See the [Get help](https://github.com/orgs/ensinolibre/discussions) link in the README.
