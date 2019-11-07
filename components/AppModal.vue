<template>
  <transition name="fade">
    <div
      ref="modal"
      :aria-label="title"
      @click="closeByBackgroundClick"
      role="dialog"
      class="modal"
    >
      <article ref="wrapper" tabindex="0" class="wrapper" role="document">
        <header>
          <h2 id="modal" class="title">{{ title }}</h2>
          <button @click="close" type="button" class="close">
            <icon-close aria-hidden="true" width="32" height="32" />
            <span class="sr-only">{{ $t('close') }}</span>
          </button>
        </header>
        <div class="content" data-qa="modal-content">
          <slot />
        </div>
      </article>
    </div>
  </transition>
</template>

<script>
import IconClose from '@/assets/icons/close.svg'

export default {
  name: 'Modal',
  components: {
    IconClose
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      nodes: null,
      lastFocus: null
    }
  },
  mounted() {
    document.body.style.overflow = 'hidden'

    this.lastFocus = document.activeElement

    this.nodes = Array.from(document.querySelectorAll('*'))
    this.nodes.forEach(node => {
      node.addEventListener('focus', this.restrictFocusOfNodesToModal)
    })

    // set the focus in the modal as soon as its visible
    this.$refs.modal.addEventListener('transitionend', this.setFocusOnModal)
    document.addEventListener('keydown', this.closeByEscapeKey)
  },
  beforeDestroy() {
    document.body.style.overflow = null
    this.nodes.forEach(node => {
      node.removeEventListener('focus', this.restrictFocusOfNodesToModal)
    })
    this.$refs.modal.removeEventListener('transitionend', this.setFocusOnModal)
    document.removeEventListener('keydown', this.closeByEscapeKey)

    // restore the focus to the last focusedbutton
    this.lastFocus.focus()
  },
  methods: {
    // keep the focus inside the modal
    restrictFocusOfNodesToModal(event) {
      const { wrapper } = this.$refs
      if (!wrapper.contains(event.target)) {
        event.stopPropagation()
        wrapper.focus()
      }
    },
    closeByEscapeKey(event) {
      if (event.keyCode === 27) {
        this.$emit('close')
      }
    },
    setFocusOnModal(event) {
      if (event.propertyName === 'opacity') {
        this.$refs.wrapper.focus()
      }
    },
    closeByBackgroundClick(event) {
      if (event.target !== this.$refs.modal) return
      this.close()
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="postcss">
.modal {
  text-align: left;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 19;
  background-color: rgba(0, 0, 0, 0.5);
  padding: var(--gutter);
  color: var(--color-text);
}

.wrapper {
  max-width: var(--container-width-md);
  position: relative;
  transition: transform 0.2s ease-out;
  background: var(--color-white);
  margin: 3em auto 1em;
}

header {
  background: var(--color-black);
  color: var(--color-white);
  display: flex;
  align-items: self-start;
  padding: 1em;
}

.title {
  flex: 1 1 auto;
  padding-right: 0.25em;
  margin: 0;
}

.content {
  padding: 1em;
}

.close {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-white);
  border-radius: 50%;
  width: 2em;
  height: 2em;
  flex: 0 0 auto;
  color: var(--color-text);

  &:hover {
    background: var(--color-gray-lighter);
  }
}

/* stylelint-disable */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;

  & .wrapper {
    transform: translateY(0);
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;

  & .wrapper {
    transform: translateY(-3em);
  }
}
/* stylelint-enable */
</style>
