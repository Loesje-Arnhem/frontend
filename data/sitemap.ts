const sitemap: SitemapUrlInput[] = []

export default defineNuxtConfig({
  sitemap: {
    urls: [
      {
        loc: '/blog/my-post',
        images: [
          {
            loc: 'https://example.com/image.jpg',
            caption: 'My image caption',
            geoLocation: 'My image geo location',
            title: 'My image title',
            license: 'My image license',
          },
        ],
      },
    ],
  },
})
