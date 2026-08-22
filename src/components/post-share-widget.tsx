"use client";

import {
  Content as DropdownContent,
  Item as DropdownItem,
  Portal as DropdownPortal,
  Root as DropdownRoot,
  Trigger as DropdownTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import site from "@/lib/site";
import { IPostType, Post } from "@/types/post-types";
import { Link2, Share2 } from "lucide-react";
import { toast } from "sonner";
import { FacebookSVGRound, HackernewsSVGV2, LinkedInSVGV2, RedditSVGV2, TwitterXSVG, WhatsappSVG } from "./icons/svgs";

type PostShareWidgetProps = {
  post: Post;
  type: IPostType;
};

const PostShareWidget = ({ post, type }: PostShareWidgetProps) => {
  const shareText = `${post.title}\r\n{ by ${site.author.name} }`;

  const [isShareOpen, setIsShareOpen] = useState(false);

  const entity = post;
  const absolutePostURL = `${site.url}/${type}/${post.slug}`;

  const copyPermalink = async () => {
    await navigator?.clipboard?.writeText(absolutePostURL);

    toast("Copied to clipboard.");
  };

  return (
    <DropdownRoot open={isShareOpen} onOpenChange={setIsShareOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownTrigger
              aria-label="Share this article"
              className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-input px-3 text-[13px] font-medium shadow-xs transition-colors hover:bg-accent"
            >
              <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
              Share
            </DropdownTrigger>
          </TooltipTrigger>
          <TooltipContent>Share this post</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownPortal>
        <DropdownContent
          sideOffset={16}
          className="z-50 w-48 rounded-lg border border-slate-200 bg-white px-2 py-3 text-sm font-medium text-slate-800 shadow-lg dark:border-slate-700 dark:bg-neutral-800 dark:text-slate-50"
        >
          {/* Permalink */}
          <DropdownItem className="outline-none!" asChild>
            <a
              onClick={copyPermalink}
              aria-label="Copy article permalink"
              className={twMerge(
                "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-normal hover:bg-slate-100 dark:hover:bg-slate-700",
              )}
            >
              <Link2 />
              <span>Permalink</span>
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
