export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) {
    return;
  }

  const nonce = useCookie("nonce");
  const token = useCookie("token");
  const cart = useCartState();

  if (cart.value) {
    return;
  }

  const response = await $fetch.raw("/api/cart/cart");
  nonce.value = response.headers.get("nonce");
  token.value = response.headers.get("token");

  cart.value = response._data;
});
