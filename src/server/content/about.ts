import fs from "node:fs";
import path from "node:path";

/** The About page bio, edited by hand in `content/about.md`. */
export default function getAbout() {
  return fs.readFileSync(path.join(process.cwd(), "content", "about.md"), "utf8");
}
