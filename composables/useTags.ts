import { computed, ref } from '@nuxtjs/composition-api'
import { Taxonomy } from '~/enums/taxonomy'

const search = ref('')
const selectedTags = ref([])
const dateBefore = ref(null)
const dateAfter = ref(null)

export default () => {
  const selectedSourceIds = computed(() => {
    const sources = selectedTags.value.filter(
      // @ts-ignore
      (tag) => tag.node.taxonomy.node.name === Taxonomy.Source,
    )
    // @ts-ignore
    return sources.map((subject) => subject.node.databaseId)
  })

  const selectedSubjectIds = computed(() => {
    const subjects = selectedTags.value.filter(
      // @ts-ignore
      (tag) => tag.node.taxonomy.node.name === Taxonomy.Subject,
    )
    // @ts-ignore
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
