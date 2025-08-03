import { z } from "zod";
import type { IPage } from "~/types/Content";
import type { ResponsePage } from "~~/server/types/ResponsePage";
import { stripHtmlTags } from "~~/server/utils/stripHtmlTags";
import type { ClubCollect } from "~/types/ClubCollect";

const querySchema = z.object({
  slug: z.string().optional(),
  id: z.string().optional(),
});

export default defineEventHandler(async (event): Promise<IPage> => {
  const query = await getValidatedQuery(event, (body) =>
    querySchema.safeParse(body),
  );

  if (!query.success) {
    throw query.error.issues;
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

  if (!response) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  }

  let youtubeId: string | undefined = undefined;
  if (response.acf.youtube_id) {
    youtubeId = response.acf.youtube_id;
  }
  const featuredImage = getFeaturedImage(
    response._embedded["wp:featuredmedia"],
  );

  const getClubCollect = (): ClubCollect | undefined => {
    if (!response.acf.clubcollect_path) {
      return undefined;
    }
    return {
      title: response.acf.clubcollect_title,
      path: response.acf.clubcollect_path,
      btn: response.acf.clubcollect_btn,
    };
  };

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
    clubCollect: getClubCollect(),
  };
});
