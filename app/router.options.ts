import type { RouterConfig } from "@nuxt/schema";

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  scrollBehavior: (to, from, savedPosition) => {
    const scrollPosition = document.documentElement.scrollTop;
    const element: HTMLDivElement | null =
      document.querySelector(".page-header-top");

    if (!element) {
      return;
    }

    let elementHeight = 0;
    if (element) {
      elementHeight = element.offsetHeight;
    }

    // // triggerScroll is only fired when a new component is loaded
    // if (to.path === from.path && to.hash !== from.hash) {
    //   nuxt.$nextTick(() => nuxt.$emit('triggerScroll'))
    // }

    return new Promise((resolve) => {
      //   nuxt.$once('triggerScroll', () => {
      if (savedPosition) {
        resolve(savedPosition);
      }

      let top = 0;

      //   const element = document.querySelector('.page-header-top')
      if (elementHeight) {
        if (scrollPosition >= elementHeight) {
          top = element.offsetHeight;
        } else {
          resolve(false);
        }
      }
      resolve({
        left: 0,
        top,
      });
    });
    // })
  },
};
