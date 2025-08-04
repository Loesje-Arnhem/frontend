import { Taxonomy } from "~/enums/taxonomy";
import type { IPoster, ITag } from "~/types/Content";
import { PosterQuerySchema, PosterSchema } from "~~/server/schemas/PosterSchema";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (body) =>
    PosterQuerySchema.safeParse(body),
  );

  if (!query.success) {
    throw query.error.issues;
  }

  const url = getUrl({
    slug: query.data.slug,
    image: true,
    type: "posters",
    fields: ["title", "yoast_head_json", "slug", "acf"],
  });

  const response = await $fetch(url);

  const parsed = PosterSchema.safeParse(response);

  if (!parsed.success) {
    throw createError({
      data: parsed.error.format(),
    });
  }

  if (parsed.data.length) {
    const item = parsed.data[0];
    const featuredImage = getFeaturedImage(
      item["wp:featuredmedia"],
      item.title.rendered,
    );

    let subjects: ITag[] = [];
    let sources: ITag[] = [];
    if (item._embedded["wp:term"]) {
      const tags = item._embedded["wp:term"].flat();
      subjects = getTagsByType(tags, Taxonomy.Subject);
      sources = getTagsByType(tags, Taxonomy.Source);
    }

    const pattern = /(\d{4})(\d{2})(\d{2})/;
    let date = undefined;
    if (item.acf.date) {
      date = new Date(item.acf.date?.replace(pattern, "$1-$2-$3")).toString();
    }

    const poster: IPoster = {
      id: item.id,
      title: item.title.rendered,
      date: date,
      pdf: item.acf.pdf,
      featuredImage,
      subjects,
      slug: item.slug,
      sources,
      // relatedProducts: getRelatedProducts(item),
    };
    return poster;
  }
  return null;
});
