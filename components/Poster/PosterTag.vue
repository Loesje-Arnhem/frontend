<template>
  <button
    type="button"
    class="tag"
    :class="{ 'is-active': isSelected(item) }"
    @click="selectTag(item)"
  >
    <span class="title">{{ item.name }}</span>
  </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      selectedTags: 'tags/selectedTags'
    })
  },
  methods: {
    ...mapActions({
      toggle: 'tags/toggle'
    }),
    isSelected(tag) {
      return this.selectedTags.includes(tag)
    },
    selectTag(tag) {
      this.toggle(tag)
    }
  }
}
</script>

<style scoped>
.tag {
  padding: 0.25em 0.75em;
  border: 2px solid var(--color-black);
  border-radius: 1em;
  background: var(--color-white);
  transition: box-shadow 0.1s ease-out;

  &.is-active {
    background: var(--color-black);
    color: var(--color-white);
  }

  &:focus {
    box-shadow: 0 0 0 1px var(--color-black);
    outline: none;
  }
}

.title {
  transition: box-shadow 0.2s ease-out;
  @nest .tag:hover & {
    box-shadow: 0 2px 0 0 currentColor;
  }
}
</style>
