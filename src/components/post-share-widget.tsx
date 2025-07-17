import {
  Content as DropdownContent,
  Item as DropdownItem,
  Portal as DropdownPortal,
  Root as DropdownRoot,
  Trigger as DropdownTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { Post } from "@/hashnode/generated/graphql";
import { IPostType } from "@/types/post-types";
import { Link2, Share2 } from "lucide-react";
import { toast } from "sonner";
import { FacebookSVGRound, HackernewsSVGV2, LinkedInSVGV2, RedditSVGV2, TwitterXSVG, WhatsappSVG } from "./icons/svgs";

type DraftType = Post & { pendingScheduledDateArrival: boolean };

type PostShareWidgetProps = {
  post: Post;
  draft?: DraftType;
  type: IPostType;
};

/**
 * Can be used for both Draft preview page and Single post page
 */

const PostShareWidget = (props: PostShareWidgetProps) => {
  const shareText = `${props.post.title}\r\n{ by ${
    props.post.author.socialMediaLinks?.twitter
      ? `@${props.post.author.socialMediaLinks?.twitter.substring(props.post.author.socialMediaLinks?.twitter.lastIndexOf("/") + 1).replace("@", "")}`
      : props.post.author.name
  } } from @hashnode`;

  const { post, draft } = props;
  const [isShareOpen, setIsShareOpen] = useState(false);

  if (post && draft) {
    throw new Error("You cannot provide both post and draft");
  }

  if (!post && !draft) {
    throw new Error("Provide at least Post or Draft");
  }

  const entity: Post | DraftType = post! || draft!;

  const absolutePostURL = `https://sm-y.dev/${props.type}/${entity.slug}`;

  const copyPermalink = async () => {
    await navigator?.clipboard?.writeText(absolutePostURL);

    toast("Copied to clipboard.");
  };

  useEffect(() => {
    if (!isShareOpen) return;
  }, [isShareOpen]);

  return (
    <DropdownRoot open={isShareOpen} onOpenChange={setIsShareOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownTrigger aria-label="Share this article" className="cursor-pointer rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Share2 className="h-4 w-4 stroke-current text-slate-800 dark:text-slate-50 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6" />
          </DropdownTrigger>
        </TooltipTrigger>
        <TooltipContent>Share</TooltipContent>
      </Tooltip>

      <DropdownPortal>
        <DropdownContent
          sideOffset={16}
          className="z-50 w-48 rounded-lg border border-slate-200 bg-white px-2 py-3 text-sm font-medium text-slate-800 shadow-lg dark:border-slate-700 dark:bg-neutral-800 dark:text-slate-50"
        >
          {/* Permalink */}
          <DropdownItem className="outline-none!" asChild>
            <a
              onClick={copyPermalink}
              aria-label={`Copy ${post ? "article permalink" : "draft link"}`}
              className={twMerge(
                "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-normal hover:bg-slate-100 dark:hover:bg-slate-700",
              )}
            >
              <Link2 />
              <span>{post ? "Permalink" : "Draft link"}</span>
            </a>
          </DropdownItem>

          {/* X (formerly Twitter) */}
          <DropdownItem className="outline-none!" asChild>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                `${absolutePostURL}?ref=x-share`,
              )}&text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener"
              className={twMerge("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-normal hover:bg-slate-100 dark:hover:bg-slate-700")}
            >
              <TwitterXSVG className="h-5 w-5 stroke-current text-slate-600 dark:text-slate-200" />
              <span>X</span>
            </a>
          </DropdownItem>

          {/* Reddit */}
          <DropdownItem className="outline-none!" asChild>
            <a
              href={`https://www.reddit.com/submit?url=${encodeURIComponent(absolutePostURL)}&title=${encodeURIComponent(entity.title)}`}
              target="_blank"
              rel="noopener"
              className={twMerge("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-normal hover:bg-slate-100 dark:hover:bg-slate-700")}
            >
              <RedditSVGV2 className="h-5 w-5 fill-current text-slate-600 dark:text-slate-200" />
              <span>Reddit</span>
            </a>
          </DropdownItem>

          {/* LinkedIn */}
          <DropdownItem className="outline-none!" asChild>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(absolutePostURL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={twMerge("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-normal hover:bg-slate-100 dark:hover:bg-slate-700")}
            >
              <LinkedInSVGV2 className="h-5 w-5 fill-current text-slate-600 dark:text-slate-200" />
              <span>LinkedIn</span>
            </a>
          </DropdownItem>

          {/* Hacker News */}
          <DropdownItem className="outline-none!" asChild>
            <a
              href={`https://news.ycombinator.com/submitlink?u=${encodeURIComponent(absolutePostURL)}&t=${encodeURIComponent(entity.title)}`}
              target="_blank"
              rel="noopener"
              className={twMerge("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-normal hover:bg-slate-100 dark:hover:bg-slate-700")}
            >
              <HackernewsSVGV2 className="h-5 w-5 fill-current text-slate-600 dark:text-slate-200" />
              <span>Hacker News</span>
            </a>
          </DropdownItem>

          {/* Facebook */}
          <DropdownItem className="outline-none!" asChild>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(absolutePostURL)}`}
              target="_blank"
              rel="noopener"
              className={twMerge("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-normal hover:bg-slate-100 dark:hover:bg-slate-700")}
            >
              <FacebookSVGRound className="h-5 w-5 fill-current stroke-current text-slate-600 dark:text-slate-200" />
              <span>Facebook</span>
            </a>
          </DropdownItem>

          {/* WhatsApp */}
          <DropdownItem className="outline-none!" asChild>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(entity.title)} ${encodeURIComponent(absolutePostURL)}`}
              target="_blank"
              rel="noopener"
              className={twMerge("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-normal hover:bg-slate-100 dark:hover:bg-slate-700")}
            >
              <WhatsappSVG className="h-5 w-5 fill-current stroke-current text-slate-600 dark:text-slate-200" />
              <span>WhatsApp</span>
            </a>
          </DropdownItem>
        </DropdownContent>
      </DropdownPortal>
    </DropdownRoot>
  );
};

export default PostShareWidget;
