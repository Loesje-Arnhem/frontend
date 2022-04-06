<template>
  <component
    :is="tag"
    :type="generatedType"
    :to="to"
    :class="cssClasses"
    :disabled="loading"
    @click="$emit('click')"
  >
    <app-loader v-if="loading" class="loader" />
    <span class="title"><slot /></span>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    to: {
      type: String,
      default: null,
    },
    buttonTag: {
      type: String,
      default: 'button',
      validator: (value: string) => {
        return ['nuxt-link', 'a', 'button'].includes(value)
      },
    },
    type: {
      type: String,
      default: 'button',
    },
    isPrimary: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const tag = computed(() => {
      if (props.to) {
        return 'nuxt-link'
      }
      return props.buttonTag
    })

    const cssClasses = computed(() => {
      const classes = []
      if (props.isPrimary) {
        classes.push('btn')

        if (tag.value !== 'nuxt-link') {
          classes.push('rough-border')
        }
      } else {
        classes.push('btn-outline')
      }

      return classes
    })

    const generatedType = computed(() => {
      if (tag.value === 'button') {
        return props.type
      }
      return null
    })
    return {
      cssClasses,
      generatedType,
      tag,
    }
  },
})
</script>

<style lang="postcss" scoped>
.btn {
  @mixin heading;

  background: var(--color-black);
  color: var(--color-white);
  text-align: center;
  display: inline-block;
  text-decoration: none;
  padding: 0.5em 2em;
  max-width: 20em;
  position: relative;

  @nest .is-loaded & {
    @supports (border-image-source: paint(rough-boxes)) {
      border-image-outset: 0.25em 0.5em;
    }
  }
}

a {
  @mixin link-reset;
}

.rough-border {
  @mixin tile-border;

  --rough-fill: var(--color-black);
}

.btn-outline {
  line-height: 1.1;
  padding: 0.25em 0.75em;
  border: 2px solid var(--color-black);
  border-radius: 1em;
  background: var(--color-white);
  transition: box-shadow 0.1s ease-out;

  &.is-active {
    background: var(--color-black);
    color: var(--color-white);
  }
}

.title {
  transition: box-shadow 0.2s ease-out;

  @nest .btn:hover & {
    box-shadow: 0 3px 0 0 currentcolor;
  }

  @nest .btn-outline:hover & {
    box-shadow: 0 2px 0 0 currentcolor;
  }
}

.loader {
  transform: scale(0.5);
}
</style>
