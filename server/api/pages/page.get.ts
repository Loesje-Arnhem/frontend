import { z } from "zod";
import type { IPage } from "~~/types/Content";
import type { ResponsePage } from "~/server/types/ResponsePage";
import { stripHtmlTags } from "~/server/utils/stripHtmlTags";

const querySchema = z.object({
  slug: z.string().optional(),
  id: z.string().optional(),
});

export default defineEventHandler(async (event): Promise<IPage> => {
  const query = await getValidatedQuery(event, (body) =>
    querySchema.safeParse(body),
  );

  if (!query.success) {
    throw createError({
      statusMessage: "Invalid arguments",
      data: query.error.format(),
    });
  }

  const url = getUrl({
    slug: query.data.slug,
    id: query.data.id,
    image: true,
    type: "pages",
    fields: ["title", "content", "yoast_head_json", "parent", "acf", "excerpt"],
  });
  let response: ResponsePage | null = null;
  if (query.data.slug) {
    const items = await $fetch<ResponsePage[]>(url);
    if (items.length) {
      response = items[0];
    }
  } else {
    response = await $fetch<ResponsePage>(url);
  }

  if (response) {
    let youtubeId: string | undefined = undefined;
    if (response.acf.youtube_id) {
      youtubeId = response.acf.youtube_id;
    }
    const featuredImage = getFeaturedImage(
      response._embedded["wp:featuredmedia"],
    );

    return {
      id: response.id,
      parentId: response.parent || response.id,
      title: response.title.rendered,
      description: stripHtmlTags(response.excerpt.rendered),
      content: response.content.rendered,
      seo: response.yoast_head_json,
      relatedProducts: getRelatedProducts(response),
      youtubeId,
      featuredImage,
      relatedPosters: getRelatedPosters(response),
    };
  }
});
