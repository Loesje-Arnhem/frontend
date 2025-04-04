export default defineNuxtRouteMiddleware((to) => {
  const headers = useRequestHeaders();

  if (headers["sec-ch-ua"]?.includes("Edge")) {
    const isPosterPage = to.matched.some((route) => route.path === "/posters");
    if (!isPosterPage) {
      return navigateTo("/posters");
    }
  }
});
