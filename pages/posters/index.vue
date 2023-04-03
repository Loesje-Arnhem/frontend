<script lang="ts" setup>
const { selectedSourceIds, selectedSubjectIds, selectedTags } = useTags()
const search = useSearch()
const dateBefore = useDateBefore()
const dateAfter = useDateAfter()

defineI18nRoute({
  paths: {
    nl: '/posters',
  },
})
</script>

<template>
  <center-wrapper>
    <posters-auto-complete />
    <poster-filters />
    <poster-tags-list :list="selectedTags" />
  </center-wrapper>
  {{ selectedTags }}
  <posters-overview-section
    :source-ids="selectedSourceIds"
    :subject-ids="selectedSubjectIds"
    :search="search"
    :date-before="dateBefore"
    :date-after="dateAfter"
  />
</template>
