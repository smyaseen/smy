"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Post } from "@/hashnode/generated/graphql";
import { List } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PostTOCModal from "./post-toc-modal";

export default function FloatingMenu({ post }: { post: Post }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Reference for the container (e.g., the post)
  const [isFloating, setIsFloating] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isTOCOpen, setIsTOCOpen] = useState(false); // State for TOC modal

  let hideTimeout: NodeJS.Timeout | null = null;

  const handleMouseEnter = () => {
    if (isScrollingUp) return;

    if (hideTimeout) clearTimeout(hideTimeout); // Cancel any pending hide
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (isScrollingUp) return;

    hideTimeout = setTimeout(() => setIsVisible(false), 200); // Delay hiding the menu
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!menuRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Determine if the menu should float or stick
      if (containerRect.bottom <= viewportHeight) {
        setIsFloating(false); // Stick to the bottom of the container
      } else {
        setIsFloating(true); // Float at the bottom of the viewport
      }

      // Handle visibility based on scroll direction
      const scrollTop = window.scrollY;
      if (scrollTop > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
        setIsScrollingUp(false);
      } else {
        // Scrolling up
        setIsVisible(true);
        setIsScrollingUp(true);
      }
      setLastScrollY(scrollTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      {isTOCOpen && <PostTOCModal post={post} onClose={() => setIsTOCOpen(false)} />}
      {/* Hover Zone */}
      <div className="fixed bottom-0 left-0 w-full h-8 z-40" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></div>

      <div ref={containerRef} className="relative">
        {/* Floating Menu */}
        <TooltipProvider>
          <div
            ref={menuRef}
            className={`group ${
              isFloating
                ? `fixed bottom-4 left-1/2 -translate-x-1/2 ${isVisible ? "translate-y-0" : "translate-y-full"}`
                : "absolute left-1/2 -translate-x-1/2"
            } z-50 flex items-center justify-center gap-2 rounded-full border  border-slate-200 bg-white p-2 shadow-md dark:border-neutral-800 dark:bg-neutral-900 transition-transform duration-300`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Comment Button */}
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Comments">
                  <MessageCircle className="h-5 w-5 text-slate-800 dark:text-slate-50" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Comments</TooltipContent>
            </Tooltip> */}

            {/* Divider */}
            {/* <div className="h-6 w-px bg-slate-400 dark:bg-slate-700" /> */}

            {/* Table of Contents Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Table of Contents"
                  onClick={() => setIsTOCOpen(true)} // Open TOC modal
                >
                  <List className="h-5 w-5 text-slate-800 dark:text-slate-50" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Table of Contents</TooltipContent>
            </Tooltip>

            {/* Divider */}
            {/* <div className="h-6 w-px bg-slate-400 dark:bg-slate-700" /> */}

            {/* Share Button */}
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Share">
                  <Share2 className="h-5 w-5 text-slate-800 dark:text-slate-50" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip> */}
          </div>
        </TooltipProvider>
      </div>
    </>
  );
}
