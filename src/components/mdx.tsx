import "@/lib/github-dark-dimmed.css";
import { cn } from "@/lib/utils";
import { Lightbulb } from "lucide-react";
import ReactMarkdown, { Components } from "react-markdown";
import { Tweet } from "react-tweet";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Alert, AlertDescription } from "./ui/alert";

const components: Components = {
  h1: ({ className, node: _n, ...props }) => <h1 className={cn("mb-4 mt-6 text-3xl font-bold", className)} {...props} />,
  h2: ({ className, node: _n, ...props }) => <h2 className={cn("mb-4 mt-6 text-2xl font-semibold", className)} {...props} />,
  h3: ({ className, node: _n, ...props }) => <h3 className={cn("mb-4 mt-6 text-xl font-semibold", className)} {...props} />,
  h4: ({ className, node: _n, ...props }) => <h4 className={cn("text-lg font-semibold", className)} {...props} />,
  h5: ({ className, node: _n, ...props }) => <h5 className={cn("text-sm font-semibold", className)} {...props} />,
  h6: ({ className, node: _n, ...props }) => <h6 className={cn("text-base font-semibold", className)} {...props} />,
  a: ({ className, href, node, target, ref, ...props }) => {
    const tweetMatch = (node?.properties?.href as string)?.match(/twitter\.com\/\w+\/status\/(\d+)/);

    if (typeof node?.properties.href === "string" && tweetMatch) {
      const tweetId = tweetMatch[1];

      if (!tweetId) return null;

      return <Tweet id={tweetId} />;
    }

    if (typeof node?.properties.href === "string" && node?.properties.href.includes("youtube.com")) {
      const youtubeId = new URL(node?.properties.href).searchParams.get("v");

      if (!youtubeId) return null;

      return <iframe src={`https://www.youtube.com/embed/${youtubeId}`} allowFullScreen className="h-96 w-full" />;
    }

    // Hashnode adds a style attribute to links, which we don't want
    delete props.style;

    return <a className={cn("underline underline-offset-4", className)} href={href ?? ""} target={target ?? "_blank"} {...props} />;
  },
  strong: ({ className, node: _n, ...props }) => <strong className={cn("font-bold", className)} {...props} />,
  p: (props) => <p className={cn("my-4", props.className)} {...props} />,
  ul: ({ className, node: _n, ...props }) => <ul className={cn("ml-6 list-disc", className)} {...props} />,
  ol: ({ className, node: _n, ...props }) => <ol className={cn("ml-6 list-decimal", className)} {...props} />,
  li: (props) => <li className={cn("mt-2", props.className)} {...props} />,
  blockquote: ({ className, node: _n, ...props }) => <blockquote className={cn("my-3 border-l-2 pl-6 italic", className)} {...props} />,
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ className, alt, ...props }) => <img className={cn("inline-block rounded-md", className)} alt={alt} {...props} />,
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  pre: ({ className, node: _n, ...props }) => <pre className={cn("mb-4 mt-6 overflow-x-auto rounded-lg p-4", className)} {...props} />,
  code: ({ className, children, node, ...props }) => {
    const isMultiline = node?.children?.length ?? 0 > 1;
    if (isMultiline) {
      const { className } = node?.properties ?? {};
      return <code className={(className as string[])?.join(" ")}>{children}</code>;
    }
    return (
      <code className={cn("relative mx-1 rounded bg-current/25 px-[0.3rem] py-[0.2rem] align-middle font-mono text-sm", className)} {...props}>
        {children}
      </code>
    );
  },
  div: (props) => {
    if (props.node?.properties.dataNodeType === "callout-emoji") return null;

    if (props.node?.properties.dataNodeType === "callout-text")
      return (
        <Alert className="my-8">
          <AlertDescription className="flex items-center">
            <Lightbulb className="mr-2 hidden h-5 w-5 sm:flex" />
            <div className="flex flex-col" {...props} />
          </AlertDescription>
        </Alert>
      );

    return <div {...props} />;
  },
};

interface MdxProps {
  code: string;
  baseUri?: string;
}

/**
 * Renders Markdown content with custom transformations and plugins.
 *
 * @param {MdxProps} props - The properties for the Mdx component.
 * @param {string} props.code - The Markdown code to be rendered.
 * @param {string} [props.baseUri] - The base URI to resolve relative links.
 *
 * @returns {JSX.Element} The rendered Markdown content.
 *
 * @remarks
 * This component uses `ReactMarkdown` to render the Markdown content and applies several transformations:
 * - `transformLink`: Transforms relative links to absolute using the `baseUri`.
 * - `transformEmbeds`: Replaces custom embed syntax with plain text.
 * - `removeAligns`: Removes alignment attributes from the code.
 * - `sanatize`: Applies the `transformEmbeds` and `removeAligns` transformations.
 *
 * The component also applies several plugins to `ReactMarkdown`:
 * - `remarkGfm`: Enables GitHub Flavored Markdown.
 * - `rehypeRaw`: Parses raw HTML.
 * - `rehypeSlug`: Adds slugs to headings.
 * - `rehypeAutolinkHeadings`: Adds links to headings.
 * - `rehypeHighlight`: Adds syntax highlighting if the code contains code blocks.
 *
 * @ts-expect-error The `rehypeHighlight` plugin is conditionally included based on the presence of code blocks.
 */
export function Mdx({ code, baseUri }: MdxProps) {
  const transformLink = (href: string) => {
    if (href.startsWith("http")) {
      return href;
    }
    return baseUri ? `${baseUri}${href}` : href;
  };

  const transformEmbeds = (code: string) => code.replace(/%\[(.*?)\]/g, "$1");

  const removeAligns = (code: string) => code.replace(/align="(left|right|center)"/g, "");

  const sanatize = (code: string) => removeAligns(transformEmbeds(code));

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw,
        rehypeSlug,
        rehypeAutolinkHeadings,
        // @ts-expect-error: rehypeHighlight plugin is conditionally included based on the presence of code blocks
        ...(code.includes("```") ? [[rehypeHighlight, { detect: true }]] : []),
      ]}
      urlTransform={transformLink}
      className="mdx"
    >
      {sanatize(code)}
    </ReactMarkdown>
  );
}
