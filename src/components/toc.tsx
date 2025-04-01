"use client";

import { TableOfContentsItem } from "@/hashnode/generated/graphql";

const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
  event.preventDefault();
  const targetElement = document.getElementById(slug);
  if (targetElement) {
    const navbarHeight = (document.querySelector("header") as HTMLElement).offsetHeight + 10;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
};

const Toc = ({ data, parentId, onClose }: { data: TableOfContentsItem[]; parentId: TableOfContentsItem["parentId"]; onClose?: () => void }) => {
  const children = data.filter((item) => item.parentId === parentId);
  if (children.length === 0) return null;
  return (
    <ul className="mt-5 flex flex-col gap-5 pl-5 font-medium text-slate-800 dark:text-neutral-200">
      {children.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.slug}`}
            className="hover:text-primary-600 hover:bg-primary-50 dark:hover:text-primary-500 underline dark:hover:bg-neutral-800"
            onClick={(event) => {
              handleLinkClick(event, item.slug);

              onClose?.();
            }}
          >
            {item.title}
          </a>

          <Toc data={data} parentId={item.id} />
        </li>
      ))}
    </ul>
  );
};

export default Toc;
