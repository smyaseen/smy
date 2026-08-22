import { Mdx } from "@/components/mdx";
import getAbout from "@/server/content/about";

export default function Bio() {
  return <Mdx code={getAbout()} />;
}
