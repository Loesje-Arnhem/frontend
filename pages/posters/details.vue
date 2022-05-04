<template>
  <app-loader v-if="loading" />
  <div v-else-if="poster">
    <center-wrapper>
      <poster-details :poster="poster" />
    </center-wrapper>
    <!-- <related-products-section :related-products="poster.relatedProducts" /> -->
    <posters-overview-section
      :not-in="poster.databaseId"
      :posters="poster.relatedPosters"
      :subject-ids="subjects"
      :title="$t('relatedTitle')"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  Ref,
  useRoute,
} from '@nuxtjs/composition-api'
import useFetch from '~/composables/useFetch'
import { IPoster } from '~/interfaces/IPoster'
import PosterQuery from '~/graphql/Posters/Poster.gql'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { slug } = route.value.params

    const params = computed(() => slug)

    const { result, loading } = useFetch({
      query: PosterQuery,
      usePayload: true,
      variables: {
        slug,
      },
      params,
      pageKey: 'poster',
    })

    const poster: Ref<IPoster | null> = computed(() => result.value?.poster)

    const subjects = computed(() => {
      if (!poster.value) {
        return []
      }
      if (poster.value.subjects.edges.length) {
        return poster.value.subjects.edges.map(
          (subject) => subject.node.databaseId,
        )
      }
      return []
    })

    return {
      loading,
      poster,
      subjects,
    }
  },

  head: {},
  nuxtI18n: {
    paths: {
      nl: '/posters/:slug',
    },
  },
})
</script>

<i18n>
{
  "nl": {
    "relatedTitle": "Gerelateerde posters"
  }
}
</i18n>
