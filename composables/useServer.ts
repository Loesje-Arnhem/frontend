import {
  type IPage,
  type IPost,
  type IPosterListItem,
  type IPostListItem,
} from '~~/types/Content'
import {
  type ResponseImage,
  type ResponsePage,
  type ResponsePost,
  type ResponsePosters,
  type ResponsePosts,
} from '~~/types/Response'

export const useServer = () => {
  const { apiUrl } = useAppConfig()

  const getFeaturedImage = (featuredImage: ResponseImage) => {
    if (!featuredImage['wp:featuredmedia']) {
      return undefined
    }
    const image = featuredImage['wp:featuredmedia'][0]
    const srcSet = Object.values(image.media_details.sizes).map((size) => {
      return `${size?.source_url} ${size?.width}w`
    })

    return {
      alt: image.alt_text,
      width: image.media_details.width,
      height: image.media_details.height,
      src: image.source_url,
      srcSet: srcSet.join(','),
    }
  }

  const getUrl = ({
    fields,
    type,
    id,
    slug,
    page,
    image,
    exclude,
    pageSize,
  }: {
    fields: string[]
    type: string
    id?: number
    slug?: string
    page?: number
    image?: Boolean
    exclude?: number
    pageSize?: number
  }) => {
    let baseUrl = `${apiUrl}${type}/`
    if (id) {
      baseUrl = `${baseUrl}${id}`
    }
    const url = new URL(baseUrl)
    if (image) {
      url.searchParams.set('_embed', 'true')
      fields.push('_links')
      fields.push('_embedded')
    }
    url.searchParams.set('_fields', fields.join(','))
    if (slug) {
      url.searchParams.set('slug', slug)
    }
    if (exclude) {
      url.searchParams.set('exclude', exclude.toString())
    }
    if (page) {
      url.searchParams.set('page', page.toString())
    }
    if (pageSize) {
      url.searchParams.set('per_page', pageSize.toString())
    }
    return url.toString()
  }

  const getPost = async (slug: string) => {
    const url = getUrl({
      slug,
      type: 'posts',
      fields: ['title', 'content', 'yoast_head_json', 'date', 'id'],
      image: true,
    })
    const response = await $fetch<ResponsePost[]>(url)

    if (response.length) {
      const featuredImage = getFeaturedImage(response[0]._embedded)
      return {
        id: response[0].id,
        title: response[0].title.rendered,
        content: response[0].content.rendered,
        seo: response[0].yoast_head_json,
        date: response[0].date,
        featuredImage,
      } as IPost
    }
    return null
  }

  const getPosts = async (page: number, exclude?: number) => {
    const url = getUrl({
      type: 'posts',
      fields: ['title', 'excerpt', 'date', 'slug'],
      page,
      image: true,
      exclude,
    })

    const response = await $fetch.raw(url).catch((error) => error.data)
    if (response.status !== 200) {
      return {
        total: 0,
        items: [],
      }
    }
    const total = Number(response.headers.get('x-wp-totalpages')) as number
    const items = response._data.map((item: ResponsePosts) => {
      const featuredImage = getFeaturedImage(item._embedded)

      return {
        slug: item.slug,
        title: item.title.rendered,
        excerpt: item.excerpt.rendered,
        date: item.date,
        featuredImage,
      }
    }) as IPostListItem[]
    return {
      total,
      items,
    }
  }

  const getPage = async ({ id, slug }: { id?: number; slug?: string }) => {
    const url = getUrl({
      slug,
      id,
      image: true,
      type: 'pages',
      fields: ['title', 'content', 'yoast_head_json', 'acf'],
    })
    let response: ResponsePage | null = null
    if (slug) {
      const items = await $fetch<ResponsePage[]>(url)
      if (items.length) {
        response = items[0]
      }
    } else {
      response = await $fetch<ResponsePage>(url)
    }
    if (response) {
      let relatedProducts: number[] = []
      if (response.acf.related_products_products) {
        relatedProducts = response.acf.related_products_products.map(
          (p) => p.product,
        )
      }
      let youtubeId: string | null = null
      if (response.youtube_id) {
        youtubeId = response.youtube_id
      }
      const featuredImage = getFeaturedImage(response._embedded)

      return {
        title: response.title.rendered,
        content: response.content.rendered,
        seo: response.yoast_head_json,
        relatedProducts,
        youtubeId,
        featuredImage,
      } as IPage
    }
    return null
  }

  const getPosters = async () => {
    const url = getUrl({
      type: 'poster',
      fields: ['title', 'slug'],
      image: true,
      pageSize: 7,
    })

    const response = await $fetch<ResponsePosters[]>(url)
    const items: IPosterListItem[] = response.map((item) => {
      const featuredImage = getFeaturedImage(item._embedded)

      return {
        slug: item.slug,
        title: item.title.rendered,
        featuredImage,
      }
    })
    return items
  }

  return {
    getPage,
    getPost,
    getPosts,
    getPosters,
  }
}
