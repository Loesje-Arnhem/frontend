<template>
  <div class="filter">
    <div class="buttons">
      <poster-filter-toggle
        :is-active="showSources"
        class="filter-item"
        @toggle="toggleList('sources')"
      >
        {{ $t('sources') }}
        <template v-if="selectedSourceIds.length">
          ({{ selectedSourceIds.length }})
        </template>
      </poster-filter-toggle>
      <poster-filter-toggle
        :is-active="showSubjects"
        class="filter-item"
        @toggle="toggleList('subjects')"
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
            name="date-before"
            min="1983-01-01"
            :max="dateAfter ? dateAfter : today"
          />
        </div>
      </div>
      <div class="filter-item">
        <div class="form-item-2">
          <label for="date-after"> {{ $t('dateAfter') }} </label>
          <input
            id="date-after"
            type="date"
            name="date-after"
            :min="dateBefore ? dateBefore : '1983-01-01'"
            :max="today"
          />
        </div>
      </div>
    </div>

    <slide-in-animation mode="out-in">
      <div v-if="showSources" key="sources" class="tags" tabindex="-1">
        <center-wrapper>
          <poster-tags-list :list="sources" />
        </center-wrapper>
      </div>

      <div v-if="showSubjects" key="subjects" class="tags" tabindex="-1">
        <center-wrapper>
          <poster-tags-list :list="subjects" />
        </center-wrapper>
      </div>
    </slide-in-animation>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapGetters } from 'vuex'
import TagsQuery from '~/graphql/Posters/Tags.gql'

export default defineComponent({
  data() {
    return {
      showSubjects: false,
      showSources: false,
      sources: [],
      subjects: [],
    }
  },
  async fetch() {
    const result = await this.$apollo.query({ query: TagsQuery })
    const { sources, subjects } = result.data
    this.sources = sources.edges
    this.subjects = subjects.edges
  },
  computed: {
    ...mapGetters('tags', ['selectedSourceIds', 'selectedSubjectIds']),
    dateBefore: {
      get() {
        return this.$store.state.tags.dateBefore
      },
      set(value) {
        this.$store.commit('tags/updateDateBefore', value)
      },
    },
    dateAfter: {
      get() {
        return this.$store.state.tags.dateAfter
      },
      set(value) {
        this.$store.commit('tags/updateDateAfter', value)
      },
    },
    today() {
      const now = new Date()
      let month = (now.getMonth() + 1) as Number | String
      let day = now.getDate() as Number | String
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      return now.getFullYear() + '-' + month + '-' + day
    },
  },

  // watch: {
  //   sources(value) {
  //     if (value) {
  //       // select national series as default
  //       const nationalSeries = value.find(
  //         (source) => source.node.databaseId === 28,
  //       )
  //       this.$store.commit('tags/add', nationalSeries)
  //     }
  //   },
  // },

  methods: {
    toggleList(type: string) {
      if (type === 'subjects') {
        this.showSubjects = !this.showSubjects
        this.showSources = false
      } else {
        this.showSources = !this.showSources
        this.showSubjects = false
      }
    },
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
    padding: 0.25em 0;
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
