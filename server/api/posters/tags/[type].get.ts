import type { ITag } from "~~/interfaces/IContent";
import type { IResponseTerm } from "~~/server/types/IResponseTerm";

export default defineEventHandler(async (event) => {
  const type = event.context.params?.type;
  if (!type) {
    return [];
  }

  const url = getUrl({
    type,
    fields: ["name", "slug", "id", "taxonomy"],
    pageSize: 99,
  });

  const response = await $fetch<IResponseTerm[]>(url, {});
  if (!response) {
    return [];
  }
  const items: ITag[] = response.map((item) => {
    return {
      id: item.id,
      slug: item.slug,
      title: item.name,
      type: item.taxonomy,
    };
  });
  return items;
});
