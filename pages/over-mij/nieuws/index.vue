<template>
  <div v-if="page.title">
    <posts-overview-container />
    <related-posters-container
      v-if="page"
      :related-posters="page.relatedPosters"
    />
  </div>
</template>

<script>
import PageQuery from '~/graphql/Page.gql'

import PostsOverviewContainer from '@/components/Posts/PostsOverview/PostsOverviewContainer.vue'
import RelatedPostersContainer from '@/components/Posters/RelatedPosters/RelatedPostersContainer.vue'

export default {
  components: {
    RelatedPostersContainer,
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
