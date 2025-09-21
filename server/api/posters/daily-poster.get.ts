import { DailyPostersSchema } from "~~/server/schemas/PostersSchema";
import type { FeaturedImage } from "~/types/Content";
import z from "zod";

export default defineCachedEventHandler(
  async (event): Promise<FeaturedImage> => {
    const query = await getValidatedQuery(event, (body) => {
      const querySchema = z.object({
        date: z.string().length(8),
      });
      return querySchema.safeParse(body);
    });

    if (!query.success) {
      throw query.error.issues;
    }

    const url = getUrl({
      type: "daily-posters",
      fields: ["title"],
      image: true,
      date: query.data.date,
    });

    const response = await $fetch(url);

    const data = parseData(response, DailyPostersSchema);

    if (!data.length) {
      throw createError({
        statusCode: 204,
      });
    }

    const featuredImage = getFeaturedImage(
      data[0]["wp:featuredmedia"],
      data[0].title.rendered,
    );

    if (!featuredImage) {
      throw createError({
        statusCode: 204,
      });
    }

    return featuredImage;
  },
  {
    maxAge: 60 * 60 * 24,
  },
);
