import { ResponseTerm } from '../types/ResponseTerm'
import { Taxonomy } from '~/enums/taxonomy'

export const getTagsByType = (
  terms: ResponseTerm[],
  type: Taxonomy.Source | Taxonomy.Subject,
) => {
  const tags = terms.filter((tag) => tag.taxonomy === type)

  return tags.map((tag) => {
    return {
      id: tag.id,
      slug: tag.slug,
      title: tag.name,
      type: tag.taxonomy,
    }
  })
}
