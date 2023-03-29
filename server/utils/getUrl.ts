export default ({
  fields,
  type,
  id,
  slug,
  page,
  image,
  subjectIds,
  exclude,
  pageSize,
  search,
  parent,
}: {
  fields: string[]
  type: string
  id?: number
  slug?: string
  page?: number
  image?: Boolean
  exclude?: number
  subjectIds?: string | null
  pageSize?: number
  search?: string
  parent?: Number
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
  const allFields = ['id', ...fields]
  url.searchParams.set('_fields', allFields.join(','))
  if (slug) {
    url.searchParams.set('slug', slug)
  }
  if (subjectIds) {
    url.searchParams.set('subjects', subjectIds)
  }
  if (search) {
    url.searchParams.set('search', search)
  }
  if (parent) {
    url.searchParams.set('parent', parent.toString())
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
