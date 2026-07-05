import type { ComponentType } from "react";

/**
 * The result of grading a single response to a block.
 *
 * `score` is a number between 0 and 1 (0 = fully wrong, 1 = fully correct).
 * Use fractional values for partial credit where that makes sense
 * (multi-select multiple choice, multi-blank fill-in-the-blank, etc).
 */
export interface GradeResult {
  score: number;
  /** Short, student-facing explanation. Keep it plain and specific. */
  feedback: string;
  /** True if the response earned full marks (score === 1). */
  correct: boolean;
}

/**
 * Props every block Editor component receives.
 *
 * `data` is the block's current saved data (or the type's default shape
 * if this is a freshly-added block). `onChange` should be called with a
 * complete, valid replacement value any time the teacher edits something,
 * so the host app can persist it.
 */
export interface BlockEditorProps<TData> {
  data: TData;
  onChange: (next: TData) => void;
}

/**
 * Props every block Renderer component receives.
 *
 * `mode` controls interactivity:
 * - "interactive": a student is answering the block. `response` is the
 *   student's current in-progress answer and `onRespond` reports changes.
 * - "review": a student's finished response is shown alongside the
 *   correct answer, typically with correct/incorrect highlighting.
 * - "print": a static, read-only rendering suitable for a printed
 *   worksheet (no inputs, no highlighting).
 */
export interface BlockRendererProps<TData, TResponse> {
  data: TData;
  mode: "interactive" | "review" | "print";
  response?: TResponse;
  onRespond?: (next: TResponse) => void;
}

/**
 * A pure grading function: given the block's data (which carries the
 * answer key) and a student's response, return a GradeResult. Must not
 * have side effects, so it can be run on a server, in a worker, or in
 * the browser and always produce the same result.
 */
export type GradeFn<TData, TResponse> = (
  data: TData,
  response: TResponse | undefined
) => GradeResult;

/**
 * The four-part contract every block type implements, bundled together
 * with an id and a human label so the host app can register it.
 */
export interface BlockDefinition<TData = any, TResponse = any> {
  /** Stable, unique identifier stored in worksheet data. Never rename once shipped. */
  id: string;
  /** Human-readable label shown in the builder's "add block" menu. */
  label: string;
  /** Short one-line description of what this block is for. */
  description: string;
  /** Runtime shape-check used to validate persisted data before rendering. */
  isValidData: (value: unknown) => value is TData;
  /** A safe default value used when a teacher adds a new block of this type. */
  createDefaultData: () => TData;
  Editor: ComponentType<BlockEditorProps<TData>>;
  Renderer: ComponentType<BlockRendererProps<TData, TResponse>>;
  grade: GradeFn<TData, TResponse>;
}

/** A lookup of every registered block, keyed by block id. */
export type BlockRegistry = Record<string, BlockDefinition>;
