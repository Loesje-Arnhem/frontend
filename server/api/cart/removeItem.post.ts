import { createCart } from "~/server/utils/createCart";

export default defineEventHandler(async (event) => {
  const { woocommerceApiUrl } = useAppConfig();

  const body = await readBody(event);
  const cookies = parseCookies(event);

  const response = await $fetch(`${woocommerceApiUrl}cart/remove-item`, {
    params: {
      key: body.key,
    },
    method: "POST",
    headers: {
      nonce: cookies.nonce,
      "cart-token": cookies.token,
    },
  });

  return createCart(response);
});
