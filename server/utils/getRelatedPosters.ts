import type { z } from "zod";
import type { IRelatedPosters } from "~~/types/Content";
import type { RelatedPostersSectionSchema } from "../schemas/RelatedPostersSchema";

export default ({
  related_posters_search,
  related_posters_subjects,
  related_posters_title,
  related_posters_posters,
}: z.infer<typeof RelatedPostersSectionSchema>): IRelatedPosters => {
  const posterIds = related_posters_posters.map((poster) => poster.poster?.ID);
  const publishedPosterIds = posterIds.filter(Number) as number[];

  // const posterIds = related_posters_posters.map((poster) => poster.poster.ID);

  return {
    title: related_posters_search,
    search: related_posters_title,
    subjects: related_posters_subjects,
    posterIds: publishedPosterIds,
  };
};
