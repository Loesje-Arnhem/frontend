import { computed, ref } from '@nuxtjs/composition-api'
import { Taxonomy } from '~/enums/taxonomy'
import { ITag } from '~/interfaces/ITag'

const search = ref('')
const selectedTags = ref([] as ITag[])
const dateBefore = ref(null)
const dateAfter = ref(null)

export default () => {
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
    search,
    selectedTags,
    dateBefore,
    dateAfter,
    selectedSourceIds,
    selectedSubjectIds,
  }
}
