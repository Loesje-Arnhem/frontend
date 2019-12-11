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

    <SlideInAnimation mode="out-in">
      <div v-if="showSources" key="sources" class="tags" tabindex="-1">
        <PostersFilterSourcesContainer />
      </div>

      <div v-if="showSubjects" key="subjects" class="tags" tabindex="-1">
        <PostersFilterSubjectContainer />
      </div>
    </SlideInAnimation>
  </div>
</template>

<script>
import PostersFilterSubjectContainer from '@/components/Posters/Filters/PostersFilterSubjectContainer.vue'
import PostersFilterSourcesContainer from '@/components/Posters/Filters/PostersFilterSourcesContainer.vue'
import PostersFilterToggle from '@/components/Posters/Filters/PosterFilterToggle.vue'
import SlideInAnimation from '@/components/Animations/SlideInAnimation.vue'

export default {
  components: {
    PostersFilterToggle,
    PostersFilterSubjectContainer,
    PostersFilterSourcesContainer,
    SlideInAnimation
  },
  data() {
    return {
      showSubjects: false,
      showSources: false
    }
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
    }
  }
}
</script>

<style lang="postcss" scoped>
.filter {
  position: relative;
}

.buttons {
  display: flex;
  margin-bottom: 1em;
  border-left: 1px solid var(--color-black);
  flex-wrap: wrap;
}

.filter-item {
  flex: 0 0 auto;
  width: 50%;
  padding: 0.5em 1em;
  border: 1px solid var(--color-black);
  border-left: 0;

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
