import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  // fetch data directly in the correct type
  const posts = await $fetch<ReturnType<typeof asSitemapUrl>>('/api/posts')
  const pages = await $fetch<{ pages: { slug: string; title: string } }>(
    '/api/posts',
  )
  return [
    ...posts,
    // map URLS as needed
    ...pages.map((p) =>
      asSitemapUrl({
        loc: p.slug,
      }),
    ),
  ]
})
