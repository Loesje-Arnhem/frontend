import { useSelectedTags } from './useState'
import { Taxonomy } from '~/enums/taxonomy'

export const useTags = () => {
  const selectedTags = useSelectedTags()

  const getSelectedTagsByTaxonomy = (
    taxonomy: Taxonomy.Source | Taxonomy.Subject,
  ) => {
    const tags = selectedTags.value.filter(tag => tag.type === taxonomy)
    return tags.map(tag => tag.id)
  }

  const selectedSourceIds = computed(() => {
    return getSelectedTagsByTaxonomy(Taxonomy.Source)
  })

  const selectedSubjectIds = computed(() => {
    return getSelectedTagsByTaxonomy(Taxonomy.Subject)
  })

  return {
    selectedTags,
    selectedSourceIds,
    selectedSubjectIds,
  }
}
