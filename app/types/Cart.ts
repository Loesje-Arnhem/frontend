import type { z } from "zod";
import type { FeaturedImage } from "./Content";
import type {
  BillingAdressSchema,
  ShippingAdressSchema,
} from "~~/server/types/CartSchema";

export type ShippingAddress = z.infer<typeof ShippingAdressSchema>;
export type BillingAdress = z.infer<typeof BillingAdressSchema>;

export type CartItem = {
  variation: {
    value: string;
    attribute: string;
  }[];
  image?: FeaturedImage;
  key: string;
  id: number;
  quantity: number;
  quantityMax: number;
  title: string;
  price: number;
  regularPrice: number | undefined;
  priceTotal: number;
};

export type Coupon = {
  code: string;
  price: number;
};

export type Cart = {
  items: CartItem[];
  prices: {
    totalItems: number;
    totalTax: number;
    totalShipping: number;
    totalPrice: number;
  };
  paymentMethods: string[];
  coupons: Coupon[];
  itemsCount: number;
  shipping_address: ShippingAddress;
  billing_address: BillingAdress;
};
