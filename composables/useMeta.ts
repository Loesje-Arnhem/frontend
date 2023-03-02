import { IPage } from '~~/interfaces/IPage'
import { IPost } from '~~/interfaces/IPost'
import { IPoster } from '~~/interfaces/IPoster'

export const useMeta = (
  content: IPage | IPost | IPoster | undefined | null,
) => {
  if (!content) {
    return
  }
  useServerSeoMeta({
    ogUrl: () => content.seo.opengraphUrl,
    ogTitle: () => content.seo.opengraphTitle || content.seo.title,
    description: () => content.seo.metaDesc,
    ogDescription: () =>
      content.seo.opengraphDescription || content.seo.metaDesc,
    ogType: () => content.seo.opengraphType,
    ogImage: () => content.seo.opengraphImage?.mediaItemUrl,
    twitterTitle: () => content.seo.twitterTitle || content.seo.title,
    twitterDescription: () =>
      content.seo.twitterDescription || content.seo.metaDesc,
    twitterImage: () => content.seo.twitterImage?.mediaItemUrl,
  })

  useHead({
    title: content.seo.title,
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(content.seo.schema.raw),
      },
    ],
  })
}
