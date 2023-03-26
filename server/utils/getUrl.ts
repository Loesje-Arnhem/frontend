export default ({
  fields,
  type,
  id,
  slug,
  page,
  image,
  exclude,
  pageSize,
  search,
}: {
  fields: string[]
  type: string
  id?: number
  slug?: string
  page?: number
  image?: Boolean
  exclude?: number
  pageSize?: number
  search?: string
}) => {
  const { apiUrl } = useAppConfig()

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
  if (search) {
    url.searchParams.set('search', search)
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
