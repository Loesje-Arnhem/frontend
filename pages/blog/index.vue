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
import PostsOverviewContainer from '@/components/Posts/PostsOverview/PostsOverviewContainer.vue'
import RelatedPostersSection from '@/components/Posters/RelatedPosters/RelatedPostersSection.vue'
import PageQuery from '~/graphql/Pages/Page.gql'

export default {
  components: {
    RelatedPostersSection,
    PostsOverviewContainer,
  },
  data() {
    return {
      page: {},
    }
  },
  apollo: {
    page: {
      query: PageQuery,
      variables: {
        uri: 'over-mij/nieuws',
      },
    },
  },
  nuxtI18n: {
    paths: {
      nl: '/over-mij/nieuws',
    },
  },
  head() {
    return {
      title: this.page.title,
    }
  },
}
</script>
