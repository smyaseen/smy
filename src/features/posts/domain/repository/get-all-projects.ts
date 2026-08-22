import { getAllPosts, isProject } from "@/server/content/posts";

export default function getAllProjects(selectedProjectsSlug?: Array<string>) {
  const projects = getAllPosts().filter(isProject);

  if (selectedProjectsSlug) {
    return projects.filter((post) => selectedProjectsSlug.includes(post.slug));
  }

  return projects;
}
