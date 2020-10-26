<template>
  <div class="filter">
    <div class="buttons">
      <posters-filter-toggle
        :is-active="showSources"
        class="filter-item"
        @toggle="toggleList('sources')"
      >
        Bronnen
      </posters-filter-toggle>
      <posters-filter-toggle
        :is-active="showSubjects"
        class="filter-item"
        @toggle="toggleList('subjects')"
      >
        Onderwerpen
      </posters-filter-toggle>

      <input type="date" class="filter-item" placeholder="Datum van" />
      <input type="date" class="filter-item" placeholder="Datum tot" />
    </div>

    <slide-in-animation mode="out-in">
      <div v-if="showSources" key="sources" class="tags" tabindex="-1">
        <center-wrapper>
          <poster-filter-tags :list="sources" />
        </center-wrapper>
      </div>

      <div v-if="showSubjects" key="subjects" class="tags" tabindex="-1">
        <center-wrapper>
          <poster-filter-tags :list="subjects" />
        </center-wrapper>
      </div>
    </slide-in-animation>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PostersFilterToggle from '~/components/Posters/Filters/PosterFilterToggle.vue'
import SlideInAnimation from '~/components/Animations/SlideInAnimation.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import PosterFilterTags from '~/components/Posters/Tags/PosterTagsList.vue'

export default {
  components: {
    PostersFilterToggle,
    SlideInAnimation,
    CenterWrapper,
    PosterFilterTags,
  },
  data() {
    return {
      showSubjects: false,
      showSources: false,
      selectedTags: [],
    }
  },
  computed: {
    ...mapGetters('tags', ['sources', 'subjects']),
  },

  methods: {
    toggleList(type) {
      if (type === 'subjects') {
        this.showSubjects = !this.showSubjects
        this.showSources = false
      } else {
        this.showSources = !this.showSources
        this.showSubjects = false
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.filter {
  position: relative;
}

.buttons {
  display: flex;
  margin-bottom: 1em;
  flex-wrap: wrap;
}

.filter-item {
  @mixin tile-border 1px, 1;

  flex: 0 0 auto;
  width: 50%;
  padding: 0.5em 1em;

  &:not(:first-child) {
    border-left: 0;
  }

  @media (--viewport-md) {
    width: 25%;
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
</style>
