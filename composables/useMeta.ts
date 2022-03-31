import { useMeta } from '@nuxtjs/composition-api'
import { ISEO } from '~/interfaces/ISEO'

const getMetaTitle = (seo: any, key: string) => {
  if (seo[key]) {
    return seo[key]
  } else if (seo.title) {
    return seo.title
  }

  return null
}

const getMetaDescripion = (seo: any, key: string) => {
  if (seo[key]) {
    return seo[key]
  } else if (seo.metaDesc) {
    return seo.metaDesc
  }
  return null
}

const getMetaImage = (seo: any, key: string) => {
  if (seo[key] && seo[key].archive) {
    return seo[key].archive
  } else if (seo.opengraphImage) {
    return seo.opengraphImage.archive
  }
  return null
}

export default () => {
  const { title, meta } = useMeta()

  const setSEO = (seo: ISEO | undefined) => {
    if (!seo) {
      return
    }
    title.value = seo.title
    meta.value = [
      {
        name: 'description',
        hid: 'description',
        content: seo.metaDesc,
      },
      // Open Graph
      {
        hid: 'og:title',
        name: 'og:title',
        content: seo.opengraphTitle,
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: getMetaDescripion(seo, 'opengraphDescription'),
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: seo.opengraphUrl,
      },
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'article',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: getMetaImage(seo, 'opengraphImage'),
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: getMetaTitle(seo, 'twitterTitle'),
      },
      {
        hide: 'twitter:description',
        name: 'twitter:description',
        content: getMetaDescripion(seo, seo.metaDesc),
      },
      {
        hide: 'twitter:image',
        name: 'twitter:image',
        content: getMetaImage(seo, 'twitterImage'),
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: seo.title,
      },
    ]
  }
  return {
    setSEO,
  }
}
