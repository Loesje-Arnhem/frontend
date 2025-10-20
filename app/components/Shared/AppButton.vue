<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    type?: 'button' | 'submit'
    isPrimary?: boolean
    loading?: boolean
    href?: string | null
    active?: boolean
    external?: boolean
  }>(),
  {
    type: 'button',
    isPrimary: true,
    loading: false,
    active: false,
    href: null,
    to: undefined,
    external: false,
  },
)

const cssClasses = computed(() => {
  const classes = []
  if (props.isPrimary) {
    classes.push('btn')
  }
  else {
    classes.push('btn-outline')
  }
  if (props.loading) {
    classes.push('is-loading')
  }

  if (props.active) {
    classes.push('is-active')
  }

  return classes
})
</script>

<template>
  <nuxt-link
    v-if="to"
    :to="to"
    :class="cssClasses"
    :external="external"
    :target="external ? '_blank' : undefined"
  >
    <app-loader
      v-if="loading"
      class="loader"
    />
    <span class="title"><slot /></span>
  </nuxt-link>

  <button
    v-else
    :type="type"
    :class="cssClasses"
    :disabled="loading === true ? 'true' : undefined"
    :href="href"
  >
    <app-loader
      v-if="loading"
      class="loader"
    />
    <span class="title"><slot /></span>
  </button>
</template>

<style scoped>
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

  .is-loaded & {
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

  .btn:hover & {
    box-shadow: 0 3px 0 0 currentcolor;
  }

  .btn-outline:hover & {
    box-shadow: 0 2px 0 0 currentcolor;
  }
}
</style>
