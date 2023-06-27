import { ofetch } from 'ofetch'
import fs from 'fs'

const PAGESIZE = 50
const FETCH_TIMEOUT = 1000


const getUrl = ({
  fields,
  type,
  slug,
  page,
  image,
  subjectIds,
  sourceIds,
  include,
  exclude,
  pageSize,
  search,
  parent,
  consumerKey,
  consumerSecret,
}) => {
  const apiUrl = 'https://shop.loesje.nl/wp-json/wp/v2/'

  let baseUrl = `${apiUrl}${type}/`
    // baseUrl = `${baseUrl}${id}`

  const url = new URL(baseUrl)
  if (image) {
    url.searchParams.set('_embed', 'true')
    fields.push('_links')
    fields.push('_embedded')
  }
  const allFields = ['id', ...fields]
  url.searchParams.set('_fields', allFields.join(','))
  if (fields.includes('acf')) {
    url.searchParams.set('acf_format', 'standard')
  }
  if (slug) {
    url.searchParams.set('slug', slug)
  }
  if (subjectIds) {
    url.searchParams.set('subjects', subjectIds)
  }
  if (sourceIds) {
    url.searchParams.set('sources', sourceIds)
  }
  if (search) {
    url.searchParams.set('search', search)
  }
  if (parent) {
    url.searchParams.set('parent', parent.toString())
  }
  if (exclude) {
    url.searchParams.set('exclude', exclude)
  }
  if (include) {
    url.searchParams.set('include', include)
  }
  if (page) {
    url.searchParams.set('page', page.toString())
  }
  if (pageSize) {
    url.searchParams.set('per_page', pageSize.toString())
  }
  if (consumerKey && consumerSecret) {
    url.searchParams.set('consumer_secret', consumerSecret)
    url.searchParams.set('consumer_key', consumerKey)
  }
  return url.toString()
}

const pauseFetching = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, FETCH_TIMEOUT)
  })
}


const getFeaturedImage = (featuredImage, title) => {
  if (!featuredImage) {
    return undefined
  }
    return undefined
  // const image = featuredImage[0]
  // const srcSet = Object.values(image.media_details.sizes).map((size) => {
  //   return `${size.source_url} ${size.width}w`
  // })
  // let alt = ''
  // if (title) {
  //   alt = title
  // } else if (image.alt_text) {
  //   alt = image.alt_text
  // }
  // const result =  {
  //   alt,
  //   width: image.media_details.width,
  //   height: image.media_details.height,
  //   src: image.source_url,
  //   srcSet: srcSet.join(','),
  // }
  // return result
}


const fetchPagesByType = async (type) => {
  const pages = []
  let hasNextPage = true
  let page = 1



  while (hasNextPage) {
  const url = getUrl({
    image: true,
    type,
    fields: ['title', 'content', 'yoast_head_json', 'date', 'acf', 'slug'],
    pageSize: PAGESIZE,
    page
  })
    // const apiUrl = `${baseUrl}/wp-json/wp/v2/${type}/?per_page=${PAGESIZE}&page=${[page]}`
    const data = await ofetch(url)

    // let suffix = ''
    // if (type === 'posts') {
    //   suffix = `/over-loesje/nieuws`
    // }

    // const urls = data.map((r) => r.link.replace(baseUrl, suffix))



    data.forEach((item) => {

    const featuredImage = getFeaturedImage(item._embedded['wp:featuredmedia'])

    let youtubeId  = null
    if (item.acf.youtube_id) {
      youtubeId = item.acf.youtube_id
    }


    const data = {
      id: item.id,
      date: item.date,
      title: item.title.rendered,
      content: item.content.rendered,
      seo: item.yoast_head_json,
      featuredImage,
      slug: item.slug,
     youtubeId,
    }

  fs.writeFileSync(`content/test/${item.slug}.json`, JSON.stringify(data));
})

    if (!data.length) {
      hasNextPage = false
    }
    if (data.length !== PAGESIZE) {
      hasNextPage = false
    }
      hasNextPage = false
    page = page + 1
    pauseFetching()
  }
  return pages

}

const posts = await fetchPagesByType('posts')

// console.log(posts)
