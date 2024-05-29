import { MenuSchema } from '~/server/schemas/MenuSchema'
import type { MenuItemWithChildren } from '~/types/MenuItem'

export default defineEventHandler(async () => {
  const response = await $fetch('https://shop.loesje.nl/wp-json/loesje/menu')

  const parsed = MenuSchema.safeParse(response)

  if (!parsed.success) {
    throw parsed.error.issues
  }

  const baseItems: MenuItemWithChildren[] = [
    { title: 'Home', id: 1, url: '/' },
    { title: 'Posters', id: 2, url: '/posters/' }]

  const navigationBaseItems = parsed.data.filter(item => item.menu_item_parent === '0')

  const navigationItems: MenuItemWithChildren[] = navigationBaseItems.map((item) => {
    const subItems = parsed.data.filter(subItem => subItem.menu_item_parent === item.ID.toString())

    const children = subItems.map((subItem) => {
      return {
        id: subItem.ID,
        title: subItem.title,
        url: subItem.url.replace('https://shop.loesje.nl/', '/'),
      }
    })

    return {
      id: item.ID,
      title: item.title,
      url: item.url.replace('https://shop.loesje.nl/', '/'),
      children,
    }
  })

  return [...baseItems, ...navigationItems]
})
