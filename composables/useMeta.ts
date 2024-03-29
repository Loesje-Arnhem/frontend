import { computed, Ref, useMeta } from '@nuxtjs/composition-api'
import { IProductCategory } from '~/interfaces/IProductCategory'
import { IPage } from '~/interfaces/IPage'
import { IPost } from '~/interfaces/IPost'
import { IPoster } from '~/interfaces/IPoster'
import { IProduct } from '~/interfaces/IProduct'

export default (
  content: Ref<IPage | IPost | IPoster | IProduct | IProductCategory | null>,
) => {
  const getMetaImage = (seo: any, key: string) => {
    if (!seo) {
      return null
    }

    if (seo[key] && seo[key].mediaItemUrl) {
      return seo[key].mediaItemUrl
    } else if (seo.opengraphImage) {
      return seo.opengraphImage.mediaItemUrl
    }
    return null
  }
  const schema = computed(() => {
    if (!content.value) {
      return null
    }
    const schemaWithBaseUrl = content.value.seo.schema.raw.replaceAll(
      'shop.',
      'www.',
    )
    const schemaWithBaseUrlAndImages = schemaWithBaseUrl.replaceAll(
      'www.loesje.nl/wp-content',
      'shop.loesje.nl/wp-content',
    )
    return JSON.parse(schemaWithBaseUrlAndImages)
  })

  useMeta(() => ({
    title: content.value?.seo.title,
    meta: [
      {
        name: 'description',
        hid: 'description',
        content: content.value?.seo.metaDesc,
      },
      // Open Graph
      {
        hid: 'og:title',
        name: 'og:title',
        content: content.value?.seo.opengraphTitle,
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          content.value?.seo.opengraphDescription ||
          content.value?.seo.metaDesc,
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: content.value?.seo.opengraphUrl,
      },
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'article',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: getMetaImage(content.value?.seo, 'opengraphImage'),
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: content.value?.seo.twitterTitle || content.value?.seo.title,
      },
      {
        hide: 'twitter:description',
        name: 'twitter:description',
        content:
          content.value?.seo.twitterDescription || content.value?.seo.metaDesc,
      },
      {
        hide: 'twitter:image',
        name: 'twitter:image',
        content: getMetaImage(content.value?.seo, 'twitterImage'),
      },
    ],

    script: [
      {
        type: 'application/ld+json',
        json: schema.value,
      },
    ],
  }))
}
