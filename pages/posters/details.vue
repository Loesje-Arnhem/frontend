<template>
  <app-loader v-if="loading" />

  <div v-else-if="poster">
    <center-wrapper>
      <poster-navigation />
      <poster-details :poster="poster" />
    </center-wrapper>
    <posters-overview-section
      :title="$t('relatedTitle')"
      :not-in="poster.databaseId"
      :subjects="[]"
    />
  </div>
</template>

<script>
import { useContext, computed } from '@nuxtjs/composition-api'
import PosterDetails from '~/components/Posters/Details/PosterDetails.vue'
import PosterNavigation from '~/components/Posters/Shared/PosterNavigation.vue'
import PostersOverviewSection from '~/components/Posters/PostersOverview/PostersOverviewSection.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import { usePoster } from '~/compositions/posters'

export default {
  setup() {
    const { params } = useContext()
    const slug = computed(() => params.value.slug)
    const { poster, loading, error } = usePoster(slug)

    return {
      poster,
      loading,
      error,
    }
  },
  components: {
    PosterDetails,
    PosterNavigation,
    PostersOverviewSection,
    CenterWrapper,
  },

  // computed: {
  //   subjects() {
  //     if (this.poster.subjects.edges.length) {
  //       return this.poster.subjects.edges.map(
  //         (subject) => subject.node.databaseId,
  //       )
  //     }
  //     return []
  //   },
  // },

  nuxtI18n: {
    paths: {
      nl: '/posters/:slug',
    },
  },
  head() {
    return {
      // title: this.poster.title,
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
