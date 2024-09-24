import { CartSchema } from "../types/CartSchema";
import type { Cart } from "~/types/Cart";
import type { FeaturedImage } from "~/types/Content";

export const createCart = (response: unknown) => {
  const parsed = CartSchema.safeParse(response);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      data: {
        message: "Something went wrong",
      },
    });
  }

  const { data } = parsed;

  const cart: Cart = {
    items: data.items.map((item) => {
      let image: FeaturedImage | undefined = undefined;

      if (item.images.length) {
        image = {
          alt: item.images[0].alt,
          src: item.images[0].src,
          srcSet: item.images[0].srcset,
        };
      }
      const { regular_price, price } = item.prices;
      let regularPrice = undefined;

      if (regular_price && price !== regular_price) {
        regularPrice = Number(regular_price) / 100;
      }
      return {
        variation: item.variation,
        image,
        key: item.key,
        id: item.id,
        quantity: item.quantity,
        quantityMax: item.quantity_limits.maximum,
        title: item.name,
        price: Number(item.prices.regular_price) / 100,
        regularPrice,
        priceTotal: Number(item.totals.line_total) / 100,
      };
    }),
    prices: {
      totalItems: Number(data.totals.total_items) / 100,
      totalTax: Number(data.totals.total_tax) / 100,
      totalShipping: Number(data.totals.total_shipping) / 100,
      totalPrice: Number(data.totals.total_price) / 100,
    },
    paymentMethods: data.payment_methods,
    coupons: data.coupons.map((coupon) => {
      return {
        code: coupon.code,
        price: Number(coupon.totals.total_discount) / 100,
      };
    }),
    itemsCount: data.items_count,
    shipping_address: data.shipping_address,
    billing_address: data.billing_address,
  };
  return cart;
};
