import { Mdx } from "@/components/mdx";
import getUser from "../domain/get-user";

export default async function Bio() {
  const { bio } = await getUser();

  return <Mdx code={bio?.markdown as string} />;
}
