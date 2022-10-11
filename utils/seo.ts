import { ISEO } from '~/interfaces/ISEO'

const getMetaTitle = (seo: ISEO, key: keyof ISEO) => {
  if (seo[key]) {
    return seo[key]
  } else if (seo.title) {
    return seo.title
  }

  return null
}

const getMetaDescripion = (seo: ISEO, key: keyof ISEO) => {
  if (seo[key]) {
    return seo[key]
  } else if (seo.metaDesc) {
    return seo.metaDesc
  }
  return seo.title
}

// const getMetaImage = (seo: ISEO, key: keyof ISEO) => {
//   // @ts-ignore
//   if (seo[key] && seo[key].archive) {
//     // @ts-ignore
//     return seo[key].archive
//   // } else if (seo.opengraphImage) {
//   //   return seo.opengraphImage.archive
//   // }
//   return null
// }

export default (seo: ISEO) => {
  return {
    title: seo.title,
    meta: [
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
      // {
      //   hid: 'og:image',
      //   name: 'og:image',
      //   content: getMetaImage(seo, 'opengraphImage'),
      // },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: getMetaTitle(seo, 'twitterTitle'),
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: getMetaDescripion(seo, 'twitterDescription'),
      },
      // {
      //   hid: 'twitter:image',
      //   name: 'twitter:image',
      //   content: getMetaImage(seo, 'twitterImage'),
      // },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: seo.title,
      },
    ],
  }
}
