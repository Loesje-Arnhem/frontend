import { z } from "zod";
import type { IPage } from "~~/types/Content";
import type { ResponsePage } from "~/server/types/ResponsePage";
import { stripHtmlTags } from "~/server/utils/stripHtmlTags";
import { PageSchema } from "~/server/schemas/PageSchema";

const querySchema = z.object({
  id: z.string(),
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
    id: query.data.id,
    image: true,
    type: "pages",
    fields: ["title", "content", "yoast_head_json", "parent", "acf", "excerpt"],
  });

  const response = await $fetch(url);

  const parsed = PageSchema.safeParse(response);

  if (!parsed.success) {
    throw createError({
      statusMessage: "Invalid schema",
      data: parsed.error.format(),
    });
  }

  // return { ...parsed.data, response };

  // if (parsed.data.length === 0) {
  //   throw createError({
  //     statusCode: 404,
  //   });
  // }

  // let youtubeId: string | undefined = undefined;
  // if (item.acf.youtube_id) {
  //   youtubeId = item.acf.youtube_id;
  // }
  // const featuredImage = getFeaturedImage(
  //   item._embedded["wp:featuredmedia"],
  // );

  const item = parsed.data;

  return {
    id: item.id,
    parentId: item.parent || item.id,
    title: item.title.rendered,
    description: stripHtmlTags(item.excerpt.rendered),
    content: item.content.rendered,
    // seo: item.yoast_head_json,
    relatedProducts: getRelatedProducts({
      related_products_title: item.acf.related_products_title,
      related_products_products: item.acf.related_products_products,
    }),
    youtubeId: item.acf.youtube_id,
    featuredImage: getFeaturedImage(item._embedded["wp:featuredmedia"]),
    relatedPosters: getRelatedPosters({
      related_posters_search: item.acf.related_posters_search,
      related_posters_subjects: item.acf.related_posters_subjects,
      related_posters_posters: item.acf.related_posters_posters,
      related_posters_title: item.acf.related_posters_title,
    }),
  };
});
