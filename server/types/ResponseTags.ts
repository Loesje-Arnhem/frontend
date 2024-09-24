import type { Taxonomy } from "~/enums/taxonomy";

export type ResponseTag = {
  id: number;
  name: string;
  slug: string;
  taxonomy: Taxonomy.Source | Taxonomy.Subject;
};
