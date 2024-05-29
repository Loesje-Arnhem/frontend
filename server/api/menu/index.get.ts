import { MenuSchema } from '~/server/schemas/MenuSchema'
import type { MenuItemWithChildren, MenuItem } from '~/types/MenuItem'

export default defineEventHandler(async () => {
  const { wpUrl } = useAppConfig()

  const baseItems: MenuItemWithChildren[] = [
    { title: 'Home', id: 1, url: '/' },
    { title: 'Posters', id: 2, url: '/posters/' }]

  const getNavigationItems: Promise<MenuItem[]> = new Promise((resolve) => {
    $fetch(`${wpUrl}/wp-json/loesje/menu`).then((response) => {
      const parsed = MenuSchema.safeParse(response)

      if (!parsed.success) {
        throw parsed.error.issues
      }

      const baseItems = parsed.data.filter(item => item.menu_item_parent === '0')

      const items: MenuItemWithChildren[] = baseItems.map((item) => {
        const subItems = parsed.data.filter(subItem => subItem.menu_item_parent === item.ID.toString())

        const children = subItems.map((subItem) => {
          return {
            id: subItem.ID,
            title: subItem.title,
            url: subItem.url.replace(wpUrl, ''),
          }
        })

        return {
          id: item.ID,
          title: item.title,
          url: item.url.replace(wpUrl, ''),
          children,
        }
      })
      resolve(items)
    })
  })

  const getProductCategoryItems: Promise<MenuItemWithChildren[]> = new Promise((resolve) => {
    $fetch('/api/product-categories/product-categories').then((response) => {
      const children: MenuItem[] = response.map((item) => {
        return {
          id: item.id,
          title: item.title,
          url: `/winkeltje/categorie/${item.url}/`,
        }
      })

      resolve([{ title: 'Winkeltje', id: 3, url: '/winkeltje/', children: children }])
    })
  })

  return Promise.all<Promise<MenuItemWithChildren[]>>([getNavigationItems, getProductCategoryItems]).then(([navigationItems, productCategoryItems]) => {
    return [...baseItems, ...navigationItems, ...productCategoryItems]
  })
})
