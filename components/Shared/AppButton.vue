<template>
  <component
    :is="tag"
    :type="generatedType"
    :to="to"
    :class="cssClasses"
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
      default: null,
    },
    buttonTag: {
      type: String,
      default: 'button',
      validator(value) {
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
  },
  computed: {
    cssClasses() {
      const classes = []
      if (this.isPrimary) {
        classes.push('btn')

        if (this.tag !== 'nuxt-link') {
          classes.push('rough-border')
        }
      } else {
        classes.push('btn-outline')
      }

      return classes
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
    },
  },
}
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

  &:disabled {
    background: transparent;
    color: var(--color-white);
    border: 2px dashed var(--color-white);

    &:hover {
      background: transparent;
    }
  }

  @nest .is-loaded & {
    @supports (border-image-source: paint(rough-boxes)) {
      border-image-outset: 0.25em 0.5em;
    }
  }
}

.rough-border {
  @mixin tile-border;

  --rough-fill: var(--color-black);
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
