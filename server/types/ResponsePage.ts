import type { ResponseImageType } from "./FeaturedImageResponseType";
import type { ResponseRelatedPoster } from "./ResponseRelatedPoster";
import type { ResponseRelatedProduct } from "./ResponseRelatedProduct";
import type { SEO } from "~/types/SEO";

export type ResponsePage = {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  parent: number;
  yoast_head_json: SEO;
  acf: {
    clubcollect_path: string;
    clubcollect_btn: string;
    clubcollect_title: string;
    youtube_id: string;
    related_posters_title: string;
    related_posters_search: string;
    related_posters_subjects: [number] | false;
    related_products_title: string | null;
    related_posters_posters: ResponseRelatedPoster[] | false;
    related_products_products: ResponseRelatedProduct[] | false;
  };
  _embedded: {
    "wp:featuredmedia"?: ResponseImageType[];
  };
};
