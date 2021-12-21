<template>
  <app-loader v-if="loading" />
  <div v-else-if="poster">
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
import { defineComponent, useRoute, computed } from '@nuxtjs/composition-api'
import { usePoster } from '~/composables/posters'

export default defineComponent({
  setup() {
    const route = useRoute()

    const { poster, loading } = usePoster(route.value.params.slug)

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
      subjects,
      loading,
      poster,
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
