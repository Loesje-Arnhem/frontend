<template>
  <div>
    <center-wrapper>
      <poster-filters />
      <posters-auto-complete />
      <poster-filter-tags :list="tags" />
    </center-wrapper>
    <posters-overview-section
      :sources="sourceIds"
      :subjects="subjectIds"
      :search="search"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PostersOverviewSection from '~/components/Posters/PostersOverview/PostersOverviewSection.vue'
import PostersAutoComplete from '~/components/Posters/AutoComplete/AutoComplete.vue'
import PosterFilters from '~/components/Posters/Filters/PosterFilters.vue'
import PosterFilterTags from '~/components/Posters/Tags/PosterTagsList.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'

export default {
  components: {
    PostersOverviewSection,
    PostersAutoComplete,
    PosterFilters,
    PosterFilterTags,
    CenterWrapper,
  },

  data() {
    return {
      title: 'Posters',
      selectedTags: [],
      search: null,
    }
  },
  head() {
    return {
      title: this.title,
    }
  },

  computed: {
    ...mapState('tags', ['tags', 'search']),

    ...mapGetters({
      sourceIds: 'tags/sourceIds',
      subjectIds: 'tags/subjectIds',
    }),
  },
  nuxtI18n: {
    paths: {
      nl: '/posters',
    },
  },
}
</script>

<style scoped lang="postcss">
.page {
  @mixin center;
}
</style>
