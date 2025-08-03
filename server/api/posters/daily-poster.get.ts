import { DailyPostersSchema } from "~~/server/schemas/PostersSchema";
import type { FeaturedImage } from "~/types/Content";

export default defineCachedEventHandler(async (): Promise<FeaturedImage> => {
  const url = getUrl({
    type: "daily-posters",
    fields: ["title"],
    image: true,
    date: getDate(),
  });

  const response = await $fetch(url);

  const data = parseData(response, DailyPostersSchema);

  if (!data.length) {
    throw createError({
      statusCode: 204,
    });
  }

  const featuredImage = getFeaturedImage(
    data[0]._embedded["wp:featuredmedia"],
    data[0].title.rendered,
  );

  if (!featuredImage) {
    throw createError({
      statusCode: 204,
    });
  }

  return featuredImage;
});
