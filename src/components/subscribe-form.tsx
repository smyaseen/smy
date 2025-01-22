import url from "@/hashnode/api-url";
import {
  Publication,
  SubscribeToNewsletterDocument,
  SubscribeToNewsletterMutation,
  SubscribeToNewsletterMutationVariables,
  SubscribeToNewsletterPayload,
} from "@/hashnode/generated/graphql";
import request from "graphql-request";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const SubscribeForm = ({ publication }: { publication: Publication }) => {
  const [status, setStatus] = useState<SubscribeToNewsletterPayload["status"]>();
  const [requestInProgress, setRequestInProgress] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const subscribe = async () => {
    const email = inputRef.current?.value;
    if (!email) return;

    setRequestInProgress(true);

    try {
      const data = await request<SubscribeToNewsletterMutation, SubscribeToNewsletterMutationVariables>(url, SubscribeToNewsletterDocument, {
        input: { publicationId: publication.id, email },
      });
      setRequestInProgress(false);
      setStatus(data.subscribeToNewsletter.status);
    } catch (error) {
      const message = (error as any).response?.errors?.[0]?.message;
      if (message) {
        window.alert(message);
      }
      setRequestInProgress(false);
    }
  };
  return (
    <>
      {!status && (
        <div className="flex flex-row w-full justify-center items-center gap-2 dark:bg-neutral-950">
          <Input ref={inputRef} placeholder="john@doe.com" type="email" />
          <Button disabled={requestInProgress} onClick={subscribe} type="submit">
            Subscribe
          </Button>
        </div>
      )}
      {status === "PENDING" && (
        <div className="relative w-full p-2 text-center">
          <p className="font-bold text-green-600 dark:text-green-500">Almost there!</p>
          <p className="font-medium text-slate-600 dark:text-neutral-300">
            Check your inbox or spam for a confirmation email and click <strong>&quot;Confirm and Subscribe&quot;</strong> to complete your
            subscription. Thanks for joining us!
          </p>
        </div>
      )}
    </>
  );
};
