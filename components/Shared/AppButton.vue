<template>
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component
    :is="tag"
    :type="generatedType"
    :to="to"
    :class="cssClass"
    @click="$emit('click')"
  >
    <span class="title"><slot /></span>
  </component>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: null
    },
    buttonTag: {
      type: String,
      default: 'button',
      validator(value) {
        return ['nuxt-link', 'a', 'button'].includes(value)
      }
    },
    type: {
      type: String,
      default: 'button'
    },
    isPrimary: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cssClass() {
      return this.isPrimary ? 'btn' : 'btn-outline'
    },
    tag() {
      if (this.to) {
        return 'nuxt-link'
      }
      return this.buttonTag
    },
    generatedType() {
      if (this.tag === 'button') {
        return this.type
      }
      return null
    }
  }
}
</script>

<style lang="postcss" scoped>
.btn {
  @mixin heading;
  background: var(--color-black);
  color: var(--color-white);
  text-align: center;
  border-radius: 0.25em;
  display: inline-block;
  text-decoration: none;
  padding: 0.75em 2em;
  border: 2px solid var(--color-white);
  max-width: 20em;
  background: var(--color-black);
  color: var(--color-white);
  position: relative;

  &:disabled {
    background: transparent;
    color: var(--color-white);
    border: 2px dashed var(--color-white);

    &:hover {
      background: transparent;
    }
  }
}

.btn-outline {
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
  @nest .btn:hover & {
    box-shadow: 0 3px 0 0 currentColor;
  }
  @nest .btn-outline:hover & {
    box-shadow: 0 2px 0 0 currentColor;
  }
}
</style>
