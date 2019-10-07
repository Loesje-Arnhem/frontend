<template>
  <component
    :is="tag"
    :type="generatedType"
    :to="to"
    :href="href"
    :class="cssClass"
    @click="$emit('onclick')"
  >
    <span class="title"><slot /></span>
  </component>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
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
      if (this.href) {
        return 'a'
      }
      return 'button'
    },
    generatedType() {
      if (this.type === 'submit' || this.type === 'button') {
        return this.type
      }
      return ''
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
  width: 100%;
  padding: 0.75em 0.5em;
  transition: background-color 0.1s ease-in-out;
  border: 2px solid var(--color-white);
  max-width: 20em;
  background: var(--color-black);
  color: var(--color-white);

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
