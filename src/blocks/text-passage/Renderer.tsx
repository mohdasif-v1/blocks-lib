import React from "react";
import type { BlockRendererProps } from "../../types";
import type { TextPassageData, TextPassageResponse } from "./schema";

/**
 * Splits plain text into paragraphs on blank lines. This is a deliberately
 * small subset of markdown (just paragraph breaks) so this package has no
 * hard dependency on a markdown parser. If a host app wants full markdown
 * (headings, bold, links, lists), it can render `data.content` itself with
 * its own markdown renderer instead of using this component.
 */
function toParagraphs(content: string): string[] {
  return content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

/**
 * Renders a text passage. Identical output in every mode since a passage
 * is read-only content with nothing to answer or review.
 */
export function Renderer({ data }: BlockRendererProps<TextPassageData, TextPassageResponse>) {
  const paragraphs = toParagraphs(data.content);

  return (
    <div className="el-block el-block--text-passage">
      {paragraphs.length === 0 ? (
        <p className="el-block__prompt el-block__prompt--empty">(no passage text yet)</p>
      ) : (
        paragraphs.map((paragraph, index) => (
          <p key={index} className="el-block__paragraph">
            {paragraph}
          </p>
        ))
      )}
    </div>
  );
}
