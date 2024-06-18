import { MenuSchema } from '~/server/schemas/MenuSchema'
import type { MenuItemWithChildren, MenuItem } from '~/types/MenuItem'

export default defineEventHandler(async () => {
  const { wpUrl } = useAppConfig()
  const config = useRuntimeConfig()

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
            id: subItem.db_id,
            title: subItem.title,
            url: subItem.url.replace(wpUrl, ''),

          }
        })

        return {
          id: item.db_id,
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
      const shopUrl = config.public.includeShop ? '' : wpUrl
      const children: MenuItem[] = response.map((item) => {
        return {
          id: item.id,
          title: item.title,
          url: `${shopUrl}/winkeltje/categorie/${item.url}/`,
          external: !config.public.includeShop,
        }
      })

      resolve([{ title: 'Winkeltje', id: 3, url: `${shopUrl}/winkeltje/`, external: !config.public.includeShop, children: children }])
    })
  })

  return Promise.all<Promise<MenuItemWithChildren[]>>([getNavigationItems, getProductCategoryItems]).then(([navigationItems, productCategoryItems]) => {
    return [...baseItems, ...navigationItems, ...productCategoryItems]
  })
})
