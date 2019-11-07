<template>
  <div class="filter">
    <div class="buttons">
      <button
        :class="{ 'is-active': showSources }"
        @click="toggleList('sources')"
        type="button"
      >
        <span class="sr-only">Bekijk alle</span>
        <span>Bronnen</span>
        <icon-chevron-down
          class="icon"
          width="12"
          height="12"
          aria-hidden="true"
        />
      </button>
      <button
        :class="{ 'is-active': showSubjects }"
        @click="toggleList('subjects')"
        type="button"
      >
        <span class="sr-only">Bekijk alle</span>
        <span>Onderwerpen</span>
        <icon-chevron-down
          class="icon"
          width="12"
          height="12"
          aria-hidden="true"
        />
      </button>
      <input type="date" placeholder="Datum van" />
      <input type="date" placeholder="Datum tot" />
    </div>
    <Transition name="slide" mode="out-in">
      <div
        key="sources"
        ref="sources"
        v-if="showSources"
        class="tags"
        tabindex="-1"
      >
        <Tags :list="sources" />
      </div>

      <div
        key="subjects"
        ref="subjects"
        v-if="showSubjects"
        class="tags"
        tabindex="-1"
      >
        <Tags :list="subjects" />
      </div>
    </Transition>
  </div>
</template>

<script>
import Tags from '@/components/Search/Tags.vue'
import IconChevronDown from '@/assets/icons/chevron-down.svg'

export default {
  components: {
    Tags,
    IconChevronDown
  },
  props: {
    sources: {
      type: Array,
      default: () => []
    },
    subjects: {
      type: Array,
      default: () => []
    }
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

      // if (this.showSources) {
      //   this.$nextTick(() => {
      //     this.$refs.sources.focus();
      //   });
      // }

      // if (this.showSubjects) {
      //   this.$nextTick(() => {
      //     this.$refs.subjects.focus();
      //   });
      // }
    }
  }
}
</script>

<style scoped>
.filter {
  position: relative;
}

.buttons {
  display: flex;
  margin-bottom: 1em;
  border-left: 1px solid var(--color-black);
  flex-wrap: wrap;
}

input,
button {
  flex: 0 0 auto;
  width: 50%;
  padding: 0.5em 1em;
  border: 1px solid var(--color-black);
  border-left: 0;

  @media (--viewport-md) {
    width: 25%;
  }
}

button {
  display: flex;
  align-items: center;
  background: var(--color-white);

  span {
    flex: 1 0 auto;
    text-align: left;
  }

  &:hover,
  &.is-active {
    background: var(--color-black);
    color: var(--color-white);
  }

  &.is-active .icon {
    transform: rotate(-180deg);
  }
}

.icon {
  @mixin icon 1em;
  flex: 0 0 auto;
  transform-origin: center;
  transition: transform 0.2s ease-out;
  margin-left: 0.5em;
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(0.5em);
  opacity: 0;
}
</style>
