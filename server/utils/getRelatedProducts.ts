import type z from "zod";
import type { IRelatedProducts } from "~/types/Content";
import type { RelatedProductsSectionSchema } from "../schemas/RelatedProductsSchema";

export default ({
  related_products_title,
  related_products_products,
}: z.infer<typeof RelatedProductsSectionSchema>):
  | IRelatedProducts
  | undefined => {
  if (!related_products_products) {
    return undefined;
  }

  const productIds = related_products_products.map(
    (product) => product.product?.ID,
  );
  const publishedProducts = productIds.filter(Number) as number[];

  if (!publishedProducts.length) {
    return undefined;
  }

  return {
    title: related_products_title ?? undefined,
    productIds: publishedProducts,
  };
};
