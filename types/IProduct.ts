import type { IFeaturedImage } from "./IMedia";
import type { IBaseContent, INodeBase } from "./INode";

export type IProductTile = INodeBase & {
  slug: string;
  name: string;
  featuredImage: IFeaturedImage | null;
  regularPrice: string;
  price: string;
  salePrice: string;
};

export type IRelatedProductProduct = {
  product: IProductTile;
};

export type IProductNode = {
  node: IProductTile;
};

export type IProducts = {
  edges: IProductNode[];
};

export type IRelatedProducts = {
  title: string | null;
  products: IRelatedProductProduct[] | null;
};

export type IProduct = IBaseContent & {
  shortDescription: string | null;
  description: string | null;
  stockStatus: string;
  featuredImage: IFeaturedImage | null;
  galleryImages: {
    edges: IFeaturedImage[];
  };
};
