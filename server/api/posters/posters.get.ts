import type { IPosterListItem } from "~~/types/Content";
import {
  PostersSchema,
  PostersQuerySchema,
} from "~/server/schemas/PostersSchema";
import { getStorageKey } from "~/server/utils/getStorageKey";

export default defineEventHandler(async (event) => {
  const { storageKey } = useAppConfig();
  const storage = useStorage(storageKey);

  const { base } = storage.getMount(storageKey);

  const query = await getValidatedQuery(event, (body) =>
    PostersQuerySchema.safeParse(body),
  );

  if (!query.success) {
    throw query.error.issues;
  }

  const key = getStorageKey(query.data, "posters");

  if ((await storage.hasItem(key)) && base) {
    return await storage.getItem(key);
  }

  const pageSize = Number(query.data.pageSize);
  const page = Number(query.data.page);

  const dateBefore = query.data.dateBefore
    ? getDate(query.data.dateBefore)
    : undefined;

  const dateAfter = query.data.dateAfter
    ? getDate(query.data.dateAfter)
    : undefined;

  const url = getUrl({
    type: "posters",
    fields: ["title", "slug", "id"],
    image: true,
    pageSize,
    include: query.data.include,
    exclude: query.data.exclude,
    subjectIds: query.data.subjectIds,
    sourceIds: query.data.sourceIds,
    search: query.data.search,
    page,
    dateBefore,
    dateAfter,
  });

  const response = await $fetch.raw(url);

  const totalPages = Number(response.headers.get("X-WP-TotalPages"));

  const parsed = parseData(response._data, PostersSchema);

  const items: IPosterListItem[] = parsed.map((item) => {
    const featuredImage = getFeaturedImage(
      item._embedded["wp:featuredmedia"],
      item.title.rendered,
    );

    return {
      id: item.id,
      slug: item.slug,
      featuredImage,
      title: item.title.rendered,
    };
  });

  const data = {
    hasNextPage: page < totalPages,
    items,
  };

  await storage.setItem(key, data);

  return data;
});
