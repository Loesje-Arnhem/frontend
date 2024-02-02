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
  productCategory,
  featured = false,
  categoryId,
  isCommerce = false,
}: {
  fields: string[]
  type: string
  id?: string
  slug?: string
  page?: number
  image?: boolean
  include?: string
  exclude?: string
  subjectIds?: string
  sourceIds?: string
  pageSize?: number
  search?: string
  parent?: number
  productCategory?: string
  featured?: boolean
  categoryId?: string
  isCommerce?: boolean
}) => {
  const { apiUrl, woocommerceApiUrl } = useAppConfig()

  let baseUrl = `${apiUrl}${type}/`
  if (id) {
    baseUrl = `${baseUrl}${id}`
  } else if (isCommerce) {
    baseUrl = `${woocommerceApiUrl}${type}/`
  }

  const url = new URL(baseUrl)
  if (image) {
    url.searchParams.set('_embed', 'true')
    fields.push('_links')
    fields.push('_embedded')
  }
  const allFields = ['id', ...fields]
  url.searchParams.set('status', 'publish')
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

  if (productCategory) {
    url.searchParams.set('category', productCategory.toString())
  }

  if (type === 'products') {
    url.searchParams.set('orderby', 'menu_order')
    url.searchParams.set('order', 'asc')
    url.searchParams.set('stock_status', 'instock')
  }

  if (featured) {
    url.searchParams.set('featured', 'true')
  }

  if (categoryId) {
    url.searchParams.set('category', categoryId)
  }

  return url.toString()
}
