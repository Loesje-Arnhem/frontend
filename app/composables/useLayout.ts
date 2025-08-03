export const useLayout = () => {
  const openMenus = ref([] as string[]);
  const menuIsOpen = useMenu();

  const add = (menuId: string) => {
    if (openMenus.value.includes(menuId)) {
      return;
    }
    openMenus.value.push(menuId);
  };

  const openMobileMenu = () => {
    menuIsOpen.value = true;
  };

  const closeMobileMenu = () => {
    menuIsOpen.value = false;
  };

  const remove = (menuId: string) => {
    openMenus.value = openMenus.value.filter((menu) => menu !== menuId);
  };

  const clear = () => {
    openMenus.value = [];
    closeMobileMenu();
  };
  return {
    openMenus,
    add,
    remove,
    clear,
    openMobileMenu,
    closeMobileMenu,
  };
};
