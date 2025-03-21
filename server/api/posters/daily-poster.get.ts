import type { ResponsePoster } from "~/server/types/ResponsePoster";
import { getDate } from "~/server/utils/getDate";
import type { FeaturedImage } from "~/types/Content";

export default defineEventHandler(async (): Promise<FeaturedImage> => {
  const url = getUrl({
    type: "daily-posters",
    fields: ["title"],
    image: true,
    date: getDate(),
  });

  const response = await $fetch<ResponsePoster[]>(url);

  if (response.length < 1) {
    throw createError({
      statusCode: 400,
      data: {
        message: "No Poster found",
      },
    });
  }

  const featuredImage: FeaturedImage | undefined = getFeaturedImage(
    response[0]._embedded["wp:featuredmedia"],
    response[0].title.rendered,
  );

  if (!featuredImage) {
    throw createError({
      statusCode: 400,
      data: {
        message: "No Poster found",
      },
    });
  }
  return featuredImage;
});
