<script lang="ts" setup>
import { GetPagePosters } from '~/graphql/Pages/Pages'
import { PAGE_SIZE_POSTERS } from '~/data/pageSizes'
import { ITags } from '~~/interfaces/ITag'

const { selectedSourceIds, selectedSubjectIds, selectedTags } = useTags()
const search = useSearch()
const dateBefore = useDateBefore()
const dateAfter = useDateAfter()

defineI18nRoute({
  paths: {
    nl: '/posters',
  },
})

const { data } = useAsyncQuery<{
  sources: ITags
  subjects: ITags
}>(GetPagePosters, {
  first: PAGE_SIZE_POSTERS,
})
</script>

<template>
  <div v-if="data">
    <center-wrapper>
      <posters-auto-complete />
      <poster-filters :sources="data.sources" :subjects="data.subjects" />
      <poster-tags-list :list="selectedTags" />
    </center-wrapper>
    <!-- <posters-overview-section
      :source-ids="selectedSourceIds"
      :subject-ids="selectedSubjectIds"
      :search="search"
      :date-before="dateBefore"
      :date-after="dateAfter"
    /> -->
  </div>
</template>
