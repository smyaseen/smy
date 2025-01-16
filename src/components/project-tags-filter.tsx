import getAllProjectTags from "@/server/get-all-project-tags";
import Filter from "./filter";

async function ProjectTagsFilter() {
  const allTags = await getAllProjectTags();

  return <Filter tags={allTags} />;
}

export default ProjectTagsFilter;
