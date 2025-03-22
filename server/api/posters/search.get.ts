import { z } from "zod";
import { PosterSearchSchema } from "~/server/schemas/PostersSchema";
import type { IPostersSearchResult } from "~~/types/Content";

const querySchema = z.object({
  search: z.string(),
});

export default defineCachedEventHandler(
  async (event): Promise<IPostersSearchResult[]> => {
    const query = await getValidatedQuery(event, (body) =>
      querySchema.safeParse(body),
    );

    if (!query.success) {
      throw query.error.issues;
    }

    const url = getUrl({
      type: "posters",
      fields: ["title", "slug", "id"],
      pageSize: 10,
      search: query.data.search,
    });

    const response = await $fetch(url);
    const parsed = parseData(response, PosterSearchSchema);

    return parsed.map((item) => {
      return {
        id: item.id,
        slug: item.slug,
        title: item.title.rendered,
      };
    });
  },
);
