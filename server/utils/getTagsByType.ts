import { IResponseTerm } from '../types/IResponseTerm'
import { Taxonomy } from '~/enums/taxonomy'

export const getTagsByType = (
  terms: IResponseTerm[],
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
