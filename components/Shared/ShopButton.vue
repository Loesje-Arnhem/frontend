<template>
  <a :href="shopUrl" class="btn">
    <span class="title"><slot /></span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { shopUrl } from '~/data/siteDetails'
export default defineComponent({
  setup() {
    return {
      shopUrl,
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
