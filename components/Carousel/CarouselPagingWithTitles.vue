<template>
  <div class="wrapper">
    <ul ref="list" class="list">
      <li
        v-for="(item, index) in items"
        :key="item"
        class="list-item"
        :class="{ active: value === index }"
      >
        <button @click="selectItem(index)">
          {{ item }}
        </button>
      </li>
    </ul>
    <app-arrow
      v-if="items.length"
      class="arrow"
      :arrow-position="arrowPosition"
      @reset-position="resetArrowPosition()"
    />
  </div>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  computed,
  watch,
  defineComponent,
  PropType,
} from '@nuxtjs/composition-api'

const Component = defineComponent({
  setup(props, { root, emit }) {
    const list = ref(null)

    const selectItem = (page: Number) => {
      emit('input', page)
    }

    const arrowPosition = reactive({
      top: 0,
      height: 2,
      left: 0,
      width: 0,
      animate: false,
    })

    const setArrowPosition = () => {
      if (!list.value) {
        return
      }
      root.$nextTick(() => {
        // @ts-ignore
        const activeLink = list.value.querySelector('.active')
        if (!activeLink) {
          return
        }
        arrowPosition.left = activeLink.offsetLeft
        arrowPosition.width = activeLink.offsetWidth
      })
    }

    const resetArrowPosition = () => {
      arrowPosition.animate = false
      setArrowPosition()
    }

    const selectedItem = computed(() => props.value)

    watch(selectedItem, () => {
      setArrowPosition()
      arrowPosition.animate = true
    })

    return {
      list,
      selectItem,
      arrowPosition,
      resetArrowPosition,
    }
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    items: {
      type: Array as PropType<String[]> | undefined | null,
      default: () => [],
    },
  },
})

export default Component
</script>

<style lang="postcss" scoped>
.wrapper {
  position: relative;
}

.list {
  @mixin list-reset;

  display: flex;
  justify-content: center;
}

.list-item {
  padding: 0.25em 1em;

  &.active {
    font-weight: var(--font-weight-bold);
  }
}

.arrow {
  bottom: 0;
}
</style>
