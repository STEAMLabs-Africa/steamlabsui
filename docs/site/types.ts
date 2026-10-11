import type * as React from "react";

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

/** One component's entry on the docs site. Files in docs/site/examples export `example` or `examples`. */
export interface Example {
  /** Anchor id, kebab-case. */
  id: string;
  name: string;
  category: "Foundations" | "Layout" | "Typography" | "Actions" | "Forms" | "Data display" | "Navigation" | "Feedback" | "Overlays" | "Motion";
  summary: string;
  /** The live preview. Rendered on the server for the HTML tab, then mounted in the browser. */
  render: () => React.ReactElement;
  /** The React snippet shown in the code panel. Keep it in step with render(). */
  code: string;
  props?: PropRow[];
  /** Extra guidance under the preview. */
  notes?: string;
  /** Preview background. */
  ground?: "background" | "ink" | "surface" | "subtle";
}
