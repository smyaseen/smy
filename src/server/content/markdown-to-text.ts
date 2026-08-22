/**
 * Flattens markdown to plain prose. Only used to give the search box something
 * to match against, so it favours being cheap over being exhaustive.
 */
export default function markdownToText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/`[^`\n]*`/g, " ") // inline code
    .replace(/<[^>]+>/g, " ") // raw html
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // images -> alt text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> label
    .replace(/^\s{0,3}#{1,6}\s+/gm, "") // headings
    .replace(/^\s{0,3}>\s?/gm, "") // blockquotes
    .replace(/^\s*[-*+]\s+/gm, "") // bullets
    .replace(/[*_~]{1,3}/g, "") // emphasis
    .replace(/\s+/g, " ")
    .trim();
}
