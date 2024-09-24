// import { getStorageKey } from '~/server/utils/getStorageKey'
import {
  AppPostersQuerySchema,
  AppPostersSchema,
} from "~/server/schemas/AppSchema";
import { Taxonomy } from "~/enums/taxonomy";

export default defineEventHandler(async (event) => {
  // const storage = useStorage('redis')

  const query = await getValidatedQuery(event, (body) =>
    AppPostersQuerySchema.safeParse(body),
  );

  if (!query.success) {
    throw query.error.issues;
  }

  // const key = getStorageKey(query.data, 'app')

  // if (await storage.getItem(key)) {
  //   return await storage.getItem(key)
  // }

  const pageSize = Number(query.data.pageSize);
  const page = Number(query.data.page);

  const url = getUrl({
    type: "posters",
    fields: ["title", "slug", "id"],
    image: true,
    pageSize,
    include: query.data.include,
    exclude: query.data.exclude,
    subjectIds: query.data.subjectIds,
    search: query.data.search,
    page,
  });

  const response = await $fetch.raw(url).catch((error) => error.data);
  const totalPages = Number(response.headers.get("X-WP-TotalPages"));

  const parsed = AppPostersSchema.safeParse(response._data);

  if (!parsed.success) {
    throw parsed.error.issues;
  }

  const items = parsed.data.map((item) => {
    const featuredImage = getFeaturedImage(
      item._embedded["wp:featuredmedia"],
      item.title.rendered,
    );

    let subjectIds: number[] = [];
    if (item._embedded["wp:term"]) {
      const tags = item._embedded["wp:term"].flat();
      const subjects = getTagsByType(tags, Taxonomy.Subject);
      subjectIds = subjects.map((subject) => subject.id);
    }

    return {
      id: item.id,
      slug: item.slug,
      featuredImage,
      title: item.title.rendered,
      subjectIds,
    };
  });

  const data = {
    hasNextPage: page < totalPages,
    items,
  };

  // await storage.setItem(key, data)

  return data;
});
