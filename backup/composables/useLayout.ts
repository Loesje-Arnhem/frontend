import { ref } from '@nuxtjs/composition-api'

const openMenus = ref([] as string[])
const mobileMenuIsOpen = ref(false)

export default () => {
  const add = (menuId: string) => {
    if (openMenus.value.includes(menuId)) {
      return
    }
    openMenus.value.push(menuId)
  }

  const openMobileMenu = () => {
    mobileMenuIsOpen.value = true
  }

  const closeMobileMenu = () => {
    mobileMenuIsOpen.value = false
  }

  const remove = (menuId: string) => {
    openMenus.value = openMenus.value.filter((menu) => menu !== menuId)
  }

  const clear = () => {
    openMenus.value = []
    closeMobileMenu()
  }
  return {
    openMenus,
    add,
    remove,
    clear,
    openMobileMenu,
    closeMobileMenu,
    mobileMenuIsOpen,
  }
}
