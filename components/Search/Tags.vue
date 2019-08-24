<template>
  <transition-group name="list" tag="ul">
    <li v-for="item in list" :key="item.id" class="list-item">
      <button
        type="button"
        class="tag"
        :class="{ 'is-active': isSelected(item) }"
        @click="selectTag(item)"
      >
        <span class="title"> {{ item.name }}</span>
      </button>
    </li>
  </transition-group>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
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
ul {
  @mixin list-reset;
  margin: 0 -0.25rem 1em;
  display: flex;
  flex-wrap: wrap;
}

li {
  margin: 0 0.25rem 0.5rem;
}

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

.list-enter-active,
.list-leave-active {
  transition: all 0.2s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(1em);
}
.list-leave-active {
  position: absolute;
}
</style>
