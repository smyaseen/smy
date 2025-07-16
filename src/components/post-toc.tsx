import { Post } from "@/hashnode/generated/graphql";
import Toc from "./toc";

type TableOfContentsItem = Post["features"]["tableOfContents"]["items"][number];

const mapTableOfContentItems = (toc: TableOfContentsItem[]) => {
  try {
    // `toc` is sometimes an array of arrays or an array of objects. Hashnode is trying to investigate this issue.
    // Meanwhile, we can use the following code to map the table of content items to handle both cases.
    return (toc ?? []).map((tocItem) => {
      const item = Array.isArray(tocItem) ? tocItem[0] : tocItem;
      return {
        id: item.id,
        level: item.level,
        slug: item.slug,
        title: item.title,
        parentId: item.parentId ?? null,
      };
    });
  } catch (error) {
    console.error("Error while mapping table of content items", {
      error,
    });
    return [];
  }
};

export const PostTOC = ({ post, isModal, onClose }: { post: Post; isModal?: boolean; onClose?: () => void }) => {
  if (!post) return null;

  return (
    <div className={`w-full px-5 `}>
      <div
        className={`mx-auto w-full max-w-(--breakpoint-md) rounded-lg ${
          isModal ? "max-h-[70vh] overflow-y-auto" : "border-b-4 border-r-4 p-5 border"
        } text-base leading-snug dark:border-neutral-800 dark:text-neutral-50 md:p-8 md:text-lg`}
      >
        <h2 className="mb-5 text-lg font-bold md:text-xl">Table of contents</h2>
        <Toc onClose={onClose} parentId={null} data={mapTableOfContentItems(post.features.tableOfContents.items)} />
      </div>
    </div>
  );
};
