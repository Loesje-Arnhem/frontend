<template>
  <div>
    <center-wrapper>
      <poster-filters />
      <posters-auto-complete />
      <poster-tags-list :list="selectedTags" />
    </center-wrapper>
    <posters-overview-section
      :sources="selectedSourceIds"
      :subjects="selectedSubjectIds"
      :search="search"
      :date-before="dateBefore"
      :date-after="dateAfter"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import useTags from '~/composables/useTags'

export default {
  setup() {
    const { search, selectedSourceIds, selectedSubjectIds, selectedTags } =
      useTags()
    return {
      search,
      selectedSourceIds,
      selectedSubjectIds,
      selectedTags,
    }
  },
  head: {
    title: 'Posters',
  },
  computed: {
    ...mapState('tags', ['dateBefore', 'dateAfter']),
  },
  nuxtI18n: {
    paths: {
      nl: '/posters',
    },
  },
}
</script>
