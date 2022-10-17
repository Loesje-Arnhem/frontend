<template>
  <div>
    <app-loader v-if="loading" />
    <posters-overview-section v-else-if="posters" :posters="posters" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ComputedRef } from '@nuxtjs/composition-api'
import { IRelatedPosters } from '~/interfaces/IPoster'
import useFetch from '~/composables/useFetch'
import { PAGE_SIZE_POSTERS } from '~/data/pageSizes'
import { GetPagePosters } from '~/graphql/Pages/Pages'
export default defineComponent({
  setup() {
    const { result, loading } = useFetch({
      query: GetPagePosters,
      pageKey: 'page-posters',
      variables: {
        first: PAGE_SIZE_POSTERS,
      },
    })

    const posters: ComputedRef<IRelatedPosters | null> = computed(() => {
      return result.value?.posters
    })

    return {
      loading,
      posters,
    }
  },
  head: {
    title: 'Posters',
  },
  nuxtI18n: {
    paths: {
      nl: '/posters/home',
    },
  },
})
</script>
