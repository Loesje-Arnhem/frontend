export default ({
  fields,
  type,
  id,
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
}: {
  fields: string[]
  type: string
  id?: number
  slug?: string
  page?: number
  image?: Boolean
  include?: string
  exclude?: string
  subjectIds?: string | null
  sourceIds?: string | null
  pageSize?: number
  search?: string
  parent?: Number
  consumerKey?: string
  consumerSecret?: string
}) => {
  const { apiUrl, woocommerceApiUrl } = useAppConfig()

  let baseUrl = `${apiUrl}${type}/`
  if (id) {
    baseUrl = `${baseUrl}${id}`
  } else if (consumerKey && consumerSecret) {
    baseUrl = `${woocommerceApiUrl}${type}/`
  }

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
  // console.log(url)
  return url.toString()
}
