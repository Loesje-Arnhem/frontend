<template>
  <div>
    <poster-navigation />

    <poster-details :poster="poster" />
    <posters-overview-section
      :title="$t('relatedTitle')"
      :not-in="poster.databaseId"
      :subjects="subjects"
    />
  </div>
</template>

<script>
import PosterDetails from '~/components/Posters/Details/PosterDetails.vue'
import PosterNavigation from '~/components/Posters/Shared/PosterNavigation.vue'
import PostersOverviewSection from '~/components/Posters/PostersOverview/PostersOverviewSection.vue'
import PosterQuery from '~/graphql/Posters/Poster.gql'

export default {
  components: {
    PosterDetails,
    PosterNavigation,
    PostersOverviewSection,
  },

  async asyncData({ app, params }) {
    const poster = await app.apolloProvider.defaultClient.query({
      query: PosterQuery,
      variables: {
        slug: params.slug,
      },
    })

    return {
      poster: poster.data.poster,
    }
  },
  computed: {
    subjects() {
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
  head() {
    return {
      title: this.poster.title,
    }
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
