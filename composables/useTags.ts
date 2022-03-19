import { computed, ref } from '@nuxtjs/composition-api'
import { Taxonomy } from '~/enums/taxonomy'
import { ITag } from '~/interfaces/ITag'

const search = ref('')
const selectedTags = ref([] as ITag[])
const dateBefore = ref(null)
const dateAfter = ref(null)

export default () => {
  const selectedSourceIds = computed(() => {
    const sources = selectedTags.value.filter(
      (tag) => tag.node.taxonomy.node.name === Taxonomy.Source,
    )
    return sources.map((subject) => subject.node.databaseId)
  })

  const selectedSubjectIds = computed(() => {
    const subjects = selectedTags.value.filter(
      (tag) => tag.node.taxonomy.node.name === Taxonomy.Subject,
    )
    return subjects.map((subject) => subject.node.databaseId)
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
