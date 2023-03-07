import { Taxonomy } from '~/enums/taxonomy'
import { useSelectedTags } from './useState'

export const useTags = () => {
  const selectedTags = useSelectedTags()

  const getSelectedTagsByTaxonomy = (taxonomy: string) => {
    const subjects = selectedTags.value.filter(
      (tag) => tag.node.taxonomy.node.name === taxonomy,
    )
    return subjects.map((subject) => subject.node.databaseId)
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
