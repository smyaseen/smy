import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

/** Hashnode exports put `align="left|right|center"` on images, which floats them in raw HTML. */
export function rehypeStripAligns() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.properties && "align" in node.properties) delete node.properties.align;
    });
  };
}

/** Off-site links open in a new tab, as they did on the old site. */
export function rehypeExternalLinks() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "a") return;
      const href = node.properties?.href;
      if (typeof href === "string" && /^https?:\/\//.test(href) && !href.startsWith("https://sm-y.dev")) {
        node.properties.target = "_blank";
        node.properties.rel = ["noopener", "noreferrer"];
      }
    });
  };
}
