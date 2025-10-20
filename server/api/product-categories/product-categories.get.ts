import type { ResponseProductCategories } from '~~/server/types/ResponseProductCategories'
import type { MenuItemWithChildren } from '~/types/MenuItem'

const sortByOrder = (items: ResponseProductCategories) => {
  return items.sort((a, b) => a.menu_order - b.menu_order)
}

export default defineEventHandler(async () => {
  const url = getUrl({
    type: 'products/categories',
    fields: ['name', 'id', 'slug', 'parent', 'menu_order'],
    pageSize: 99,
    isCommerce: true,
  })

  const response = await $fetch<ResponseProductCategories>(url)

  const sortedItems = sortByOrder(response)

  const parents = sortedItems.filter(item => item.parent === 0)

  const parentsWithChildren: MenuItemWithChildren[] = parents.map((item) => {
    const children = response.filter(child => child.parent === item.id)
    return {
      id: item.id,
      title: item.name,
      url: item.slug,
      children: children.map((child) => {
        return {
          id: child.id,
          title: child.name,
          url: child.slug,
        }
      }),
    }
  })

  return parentsWithChildren
})
