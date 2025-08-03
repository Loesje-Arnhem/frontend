import { defineSitemapEventHandler } from "#imports";
import { SitemapQuerySchema } from "~~/server/schemas/SitemapSchema";
import { createSitemap } from "~~/server/utils/createSitemap";

export default defineSitemapEventHandler(async (event) => {
  const query = await getValidatedRouterParams(event, (body) => {
    return SitemapQuerySchema.safeParse(body);
  });

  if (!query.success) {
    throw query.error.issues;
  }

  return await createSitemap(query.data.type);
});
