<template>
  <nuxt-link v-if="to" :to="to" :class="cssClasses" :type="generatedType">
    <span class="title"><slot /></span>
  </nuxt-link>

  <component
    :is="tag"
    v-else
    :type="generatedType"
    :class="cssClasses"
    :disabled="loading"
    :href="href"
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
    href: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const tag = computed(() => {
      if (props.href) {
        return 'a'
      }
      return 'button'
    })

    const cssClasses = computed(() => {
      const classes = []
      if (props.isPrimary) {
        classes.push('btn')
      } else {
        classes.push('btn-outline')
      }
      if (props.loading) {
        classes.push('is-loading')
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
  justify-content: center;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  padding: 0.75em 2em;
  max-width: 20em;
  gap: 0.25em;
  position: relative;

  @nest .is-loaded & {
    @supports (border-image-source: paint(rough-boxes)) {
      border-image-outset: 0.25em 0.5em;
    }
  }

  & .loader {
    margin: 0;
    transform: scale(0.75);
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
</style>
