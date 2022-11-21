<template>
  <div>
    <center-wrapper>
      <posters-auto-complete />
      <poster-filters :sources="sources" :subjects="subjects" />
      <poster-tags-list :list="selectedTags" />
    </center-wrapper>
    <app-loader v-if="loading" />

    <posters-overview-section
      v-else-if="posters"
      :source-ids="selectedSourceIds"
      :subject-ids="selectedSubjectIds"
      :search="search"
      :date-before="dateBefore"
      :date-after="dateAfter"
      :posters="posters"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ComputedRef } from '@nuxtjs/composition-api'
import { IRelatedPosters } from '~/interfaces/IPoster'
import useFetch from '~/composables/useFetch'
import { PAGE_SIZE_POSTERS } from '~/data/pageSizes'
import useTags from '~/composables/useTags'
import { GetPagePosters } from '~/graphql/Pages/Pages'
import { ITags } from '~/interfaces/ITag'
export default defineComponent({
  setup() {
    const {
      search,
      selectedSourceIds,
      selectedSubjectIds,
      selectedTags,
      dateBefore,
      dateAfter,
    } = useTags()
    const { result, loading } = useFetch({
      query: GetPagePosters,
      pageKey: 'page-posters',
      variables: {
        first: PAGE_SIZE_POSTERS,
      },
    })

    const posters: ComputedRef<IRelatedPosters | null> = computed(() => {
      if (
        search.value ||
        selectedSourceIds.value.length ||
        selectedSubjectIds.value.length
      ) {
        return {
          pageInfo: {
            endCursor: '',
            hasNextPage: true,
          },
          edges: [],
        }
      }
      return result.value?.posters
    })

    const sources: ComputedRef<ITags | null> = computed(() => {
      return result.value?.sources
    })

    const subjects: ComputedRef<ITags | null> = computed(() => {
      return result.value?.subjects
    })

    return {
      search,
      selectedSourceIds,
      selectedSubjectIds,
      selectedTags,
      dateBefore,
      dateAfter,
      loading,
      posters,
      sources,
      subjects,
    }
  },
  head: {
    title: 'Posters',
  },
  nuxtI18n: {
    paths: {
      nl: '/posters',
    },
  },
})
</script>
