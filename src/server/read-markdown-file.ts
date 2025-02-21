import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function readMarkdownFile(slug: string) {
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}`);

  console.log("🚀 ~ readMarkdownFile ~ filePath:", filePath)
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");

    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Markdown file not found" }), { status: 404 });
  }
}
