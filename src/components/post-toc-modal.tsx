import { PostTOC } from "@/components/post-toc";
import { Button } from "@/components/ui/button";
import { Post } from "@/hashnode/generated/graphql";
import { useEffect } from "react";

export default function PostTOCModal({ post, onClose }: { post: Post; onClose: () => void }) {
  useEffect(() => {
    // Disable scrolling when the modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = ""; // Re-enable scrolling when the modal is closed
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50 px-5">
      <div className="relative w-full max-w-3xl p-2 bg-white rounded-lg shadow-lg dark:bg-neutral-900">
        <Button variant="ghost" className="absolute top-4 right-4 text-xl font-bold text-black dark:text-white" onClick={onClose}>
          ✕
        </Button>
        <PostTOC post={post} isModal onClose={onClose} />
      </div>
    </div>
  );
}
