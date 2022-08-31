<template>
  <div v-if="show && text" :class="type" class="alert">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'warning',
    },
  },
  setup(props) {
    const show = ref(true)

    const icon = computed(() => {
      if (props.type === 'success') {
        return 'check'
      }
      return 'warning'
    })
    const close = () => {
      show.value = false
    }
    return {
      show,
      icon,
      close,
    }
  },
})
</script>

<style scoped lang="postcss">
.alert {
  display: flex;
  margin-bottom: 1em;
  color: var(--color-white);
  padding: 0.5em 1em;
  line-height: 1.2;
}

.icon-alert {
  top: 0.1em;
  flex: 0 0 auto;
  margin-right: 0.5em;
}

.warning {
  background: var(--color-black);
}

.success {
  background: var(--color-black);
}
</style>
