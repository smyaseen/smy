"use client";

import { Publication } from "@/hashnode/generated/graphql";
import * as Popover from "@radix-ui/react-popover";
import { NewspaperIcon } from "lucide-react";
import { SubscribeForm } from "./subscribe-form";
import { Button } from "./ui/button";

const Subscribe = ({ publication }: { publication: Publication }) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant={"outline"} className="flex flex-row gap-2">
          <p>Subscribe</p>
          <NewspaperIcon className="h-4 w-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-[350px] rounded-xl border bg-gray-100 p-5 shadow-xl dark:border-neutral-800 dark:bg-neutral-900 md:w-[500px]"
          align="end"
          sideOffset={5}
        >
          <h3 className="mb-2 text-base font-semibold text-center text-primary-600">Subscribe to my newsletter for updates and changelog.</h3>
          <SubscribeForm publication={publication} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Subscribe;
