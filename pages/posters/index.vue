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
  <posters-overview-section
    :search="search"
    :date-before="dateBefore"
    :date-after="dateAfter"
    :source-ids="selectedSourceIds"
    :subject-ids="selectedSubjectIds"
  />
</template>
