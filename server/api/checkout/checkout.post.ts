import { z } from "zod";
import {
  BillingAdressSchema,
  CheckoutSchema,
  ShippingAdressSchema,
} from "~~/server/types/CartSchema";

const bodySchema = z.object({
  billing_address: BillingAdressSchema,
  shipping_address: ShippingAdressSchema,
  payment_method: z.string(),
  shipToDifferentAddress: z.boolean(),
});

export default defineEventHandler(async (event) => {
  const { woocommerceApiUrl } = useAppConfig();

  const formData = await readValidatedBody(event, (body) =>
    bodySchema.safeParse(body),
  );

  if (!formData.success) {
    throw createError({
      statusCode: 400,
      data: {
        data: formData.error.format(),
      },
    });
  }

  const cookies = parseCookies(event);

  const {
    shipping_address,
    billing_address,
    payment_method,
    shipToDifferentAddress,
  } = formData.data;

  if (!shipToDifferentAddress) {
    shipping_address.first_name = billing_address.first_name;
    shipping_address.last_name = billing_address.last_name;
    shipping_address.company = billing_address.company;
    shipping_address.address_1 = billing_address.address_1;
    shipping_address.address_2 = billing_address.address_2;
    shipping_address.city = billing_address.city;
    shipping_address.state = billing_address.state;
    shipping_address.postcode = billing_address.postcode;
    shipping_address.country = billing_address.country;
  }
  try {
    const response = await $fetch(`${woocommerceApiUrl}checkout`, {
      body: {
        payment_method,
        billing_address: {
          first_name: billing_address.first_name,
          last_name: billing_address.last_name,
          company: billing_address.company,
          address_1: billing_address.address_1,
          address_2: billing_address.address_2,
          city: billing_address.city,
          state: billing_address.state,
          postcode: billing_address.postcode,
          country: billing_address.country,
          email: billing_address.email,
        },
        shipping_address: {
          first_name: shipping_address.first_name,
          last_name: shipping_address.last_name,
          company: shipping_address.company,
          address_1: shipping_address.address_1,
          address_2: shipping_address.address_2,
          city: shipping_address.city,
          state: shipping_address.state,
          postcode: shipping_address.postcode,
          country: shipping_address.country,
        },
      },
      method: "POST",

      headers: {
        nonce: cookies.nonce,
        "cart-token": cookies.token,
      },
    });

    const parsed = CheckoutSchema.safeParse(response);

    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        data: {
          data: parsed.error.format(),
        },
      });
    }

    return parsed.data;
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.data.message,
    });
  }
});
