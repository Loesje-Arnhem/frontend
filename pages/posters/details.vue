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
      :subjects="subjects"
    />
  </div>
</template>

<script>
import { useContext, computed } from '@nuxtjs/composition-api'
import { usePoster } from '~/compositions/posters'

export default {
  setup() {
    const { params } = useContext()
    const slug = computed(() => params.value.slug)
    const { poster, loading, error } = usePoster(slug)

    const subjects = computed(() => {
      if (poster.value.subjects.edges.length) {
        return poster.value.subjects.edges.map(
          (subject) => subject.node.databaseId,
        )
      }
      return []
    })
    return {
      subjects,
      poster,
      loading,
      error,
    }
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
