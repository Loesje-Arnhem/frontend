import type { ResponsePost } from "../types/ResponsePost";
import type { ResponsePoster } from "../types/ResponsePoster";
import type { ResponsePage } from "~/server/types/ResponsePage";
import type { IRelatedProducts } from "~/types/Content";

export default (page: ResponsePage | ResponsePost | ResponsePoster) => {
  const { related_products_products, related_products_title } = page.acf;

  if (!related_products_products) {
    return undefined;
  }

  const productIds: number[] = related_products_products.map(
    (product) => product.product.ID,
  );

  const products: IRelatedProducts = {
    title: related_products_title ?? undefined,
    productIds,
  };
  return products;
};
