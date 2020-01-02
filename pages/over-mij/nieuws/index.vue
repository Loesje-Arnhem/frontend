<template>
  <div v-if="page.title">
    <posts-overview-container />
    <related-posters-section
      v-if="page"
      :related-posters="page.relatedPosters"
    />
  </div>
</template>

<script>
import PageQuery from '~/graphql/Page.gql'

import PostsOverviewContainer from '@/components/Posts/PostsOverview/PostsOverviewContainer.vue'
import RelatedPostersSection from '@/components/Posters/RelatedPosters/RelatedPostersSection.vue'

export default {
  components: {
    RelatedPostersSection,
    PostsOverviewContainer
  },
  data() {
    return {
      page: {}
    }
  },
  apollo: {
    page: {
      query: PageQuery,
      variables: {
        uri: 'over-mij/nieuws'
      }
    }
  },
  head() {
    return {
      title: this.page.title
    }
  }
}
</script>
