<template>
  <div class="filter">
    <div class="buttons">
      <poster-filter-toggle
        :is-active="activeOverlays.sources"
        class="filter-item"
        @toggle="toggleOverlay('sources')"
      >
        {{ $t('sources') }}
        <template v-if="selectedSourceIds.length">
          ({{ selectedSourceIds.length }})
        </template>
      </poster-filter-toggle>
      <poster-filter-toggle
        :is-active="activeOverlays.subjects"
        class="filter-item"
        @toggle="toggleOverlay('subjects')"
      >
        {{ $t('subjects') }}
        <template v-if="selectedSubjectIds.length">
          ({{ selectedSubjectIds.length }})
        </template>
      </poster-filter-toggle>
      <div class="filter-item">
        <div class="form-item-2">
          <label for="date-before"> {{ $t('dateBefore') }} </label>
          <input
            id="date-before"
            v-model="dateBefore"
            type="date"
            name="date-before"
            min="1983-01-01"
            :max="dateAfter ? dateAfter : today()"
          />
        </div>
      </div>
      <div class="filter-item">
        <div class="form-item-2">
          <label for="date-after"> {{ $t('dateAfter') }} </label>
          <input
            id="date-after"
            v-model="dateAfter"
            type="date"
            name="date-after"
            :min="dateBefore ? dateBefore : '1983-01-01'"
            :max="today()"
          />
        </div>
      </div>
    </div>

    <slide-in-animation mode="out-in">
      <div
        v-if="activeOverlays.sources"
        key="sources"
        class="tags"
        tabindex="-1"
      >
        <center-wrapper v-if="tags">
          <poster-tags-list :list="tags.sources.edges" />
        </center-wrapper>
      </div>

      <div
        v-if="activeOverlays.subjects"
        key="subjects"
        class="tags"
        tabindex="-1"
      >
        <center-wrapper v-if="tags">
          <poster-tags-list :list="tags.subjects.edges" />
        </center-wrapper>
      </div>
    </slide-in-animation>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable'
import useTags from '~/composables/useTags'
import TagsQuery from '~/graphql/Posters/Tags.gql'

export default defineComponent({
  setup() {
    const { selectedSourceIds, selectedSubjectIds, dateBefore, dateAfter } =
      useTags()
    const activeOverlays = reactive({
      sources: false,
      subjects: false,
    })

    const toggleOverlay = (type: string) => {
      if (type === 'subjects') {
        activeOverlays.subjects = !activeOverlays.subjects
        activeOverlays.sources = false
      } else {
        activeOverlays.sources = !activeOverlays.sources
        activeOverlays.subjects = false
      }
    }

    const { result } = useQuery(TagsQuery)

    const today = () => {
      const now = new Date()
      let month = (now.getMonth() + 1) as Number | String
      let day = now.getDate() as Number | String
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      return now.getFullYear() + '-' + month + '-' + day
    }
    return {
      today,
      tags: result,
      toggleOverlay,
      activeOverlays,
      selectedSourceIds,
      selectedSubjectIds,
      dateBefore,
      dateAfter,
    }
  },
})
</script>

<style lang="postcss" scoped>
.filter {
  position: relative;
}

.buttons {
  @mixin tile-border;

  display: flex;
  margin-bottom: 1em;
  flex-wrap: wrap;
}

.filter-item {
  border-bottom: 1px solid var(--color-black);
  flex: 0 0 auto;
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;

  &:last-child {
    border-bottom: 0;
  }

  @media (--viewport-sm) {
    width: 50%;

    &:nth-child(2n + 1) {
      border-right: 1px solid var(--color-black);
    }

    &:nth-child(3) {
      border-bottom: 0;
    }
  }

  @media (--viewport-lg) {
    width: 25%;
    border-bottom: 0;

    &:nth-child(2) {
      border-right: 1px solid var(--color-black);
    }
  }
}

.tags {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  padding: 1em 0 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
}

.form-item-2 {
  display: flex;
  align-items: center;

  & label {
    margin: 0;
  }

  & input {
    flex: 1 1 auto;
    margin-left: 0.25em;
    border: 0;
  }
}
</style>

<i18n>
{
  "nl": {
    "sources": "Bronnen",
    "subjects": "Onderwerpen",
    "dateBefore": "Voor",
    "dateAfter": "Van"
  }
}
</i18n>
