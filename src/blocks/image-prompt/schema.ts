export interface ImagePromptData {
  imageUrl: string;
  /** Required for accessibility: describes the image for screen readers. */
  imageAlt: string;
  question: string;
}

/** A student's response: their free-text answer about the image. */
export type ImagePromptResponse = string;

export function isImagePromptData(value: unknown): value is ImagePromptData {
  if (typeof value !== "object" || value === null) return false;
  const d = value as Record<string, unknown>;
  return (
    typeof d.imageUrl === "string" &&
    typeof d.imageAlt === "string" &&
    typeof d.question === "string"
  );
}

export function createDefaultImagePromptData(): ImagePromptData {
  return { imageUrl: "", imageAlt: "", question: "" };
}
