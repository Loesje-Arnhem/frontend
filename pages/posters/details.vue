<template>
  <div v-if="poster">
    <center-wrapper>
      <poster-details :poster="poster" />
    </center-wrapper>
    <related-products-section :related-products="poster.relatedProducts" />
    <posters-overview-section
      :title="$t('relatedTitle')"
      :not-in="poster.databaseId"
      :subjects="subjects"
    />
  </div>
</template>

<script>
import PosterQuery from '~/graphql/Posters/Poster.gql'

export default {
  async asyncData({ app, params }) {
    const { defaultClient } = app.apolloProvider
    const result = await defaultClient.query({
      query: PosterQuery,
      variables: {
        slug: params.slug,
      },
    })
    return {
      poster: result.data.poster,
    }
  },
  head() {
    return {
      title: this.poster.title,
    }
  },
  computed: {
    subjects() {
      if (!this.poster) {
        return []
      }
      if (this.poster.subjects.edges.length) {
        return this.poster.subjects.edges.map(
          (subject) => subject.node.databaseId,
        )
      }
      return []
    },
  },
  nuxtI18n: {
    paths: {
      nl: '/posters/:slug',
    },
  },
}
</script>

<i18n>
{
  "nl": {
    "relatedTitle": "Gerelateerde posters"
  }
}
</i18n>
