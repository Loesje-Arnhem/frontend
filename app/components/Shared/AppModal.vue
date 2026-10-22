<script lang="ts" setup>
defineProps<{
  title: string
}>()

const emit = defineEmits(['close'])

const isHidden = ref(false)
const dialog = useTemplateRef('dialog')

const startClosingAnimation = () => {
  isHidden.value = true
}

const close = () => {
  if (isHidden.value && dialog.value) {
    isHidden.value = false
    dialog.value.close()
  }
}

const afterClosing = () => {
  emit('close')
}

onMounted(() => {
  if (dialog.value) {
    dialog.value.showModal()
    dialog.value.addEventListener('close', afterClosing)
  }
})

onUnmounted(() => {
  if (dialog.value) {
    dialog.value.removeEventListener('close', afterClosing)
  }
})
</script>

<template>
  <dialog
    ref="dialog"
    class="dialog"
    :class="{ 'is-hidden': isHidden }"
    @animationend="close"
  >
    <div class="header">
      <h1 class="title">
        {{ title }}
      </h1>
      <button
        class="btn-close"
        autofocus
        @click="startClosingAnimation"
      >
        <app-icon
          icon="close"
          class="icon"
        />
      </button>
    </div>
    <slot />
  </dialog>
</template>

<style lang="css" scoped>
.dialog {
  inline-size: calc(100% - var(--gutter) * 2);
  max-inline-size: var(--container-width-md);
  padding: 0 var(--gutter) 5em;
  border: 4px solid var(--color-black);

  &::backdrop {
    background: var(--color-black);
    opacity: 0.75;
  }

  &[open] {
    animation: show-dialog var(--animation);

    &::backdrop {
      animation: show-backdrop var(--animation);
    }
  }

  &.is-hidden {
    animation: hide-dialog var(--animation);

    &::backdrop {
      animation: hide-backdrop var(--animation);
    }
  }
}

.header {
  position: sticky;
  inset-block-start: 0;
  z-index: 9;
  display: flex;
  gap: 0.5em;
  align-items: flex-start;
  justify-content: space-between;
  padding-block: var(--gutter);
  margin-block-end: 0.5em;
  background-color: var(--color-white);
  border-block-end: 1px solid var(--color-black);
}

.title {
  margin-block-end: 0;
}

.btn-close {
  flex: 0 0 auto;
}

.icon {
  inline-size: 2em;
}

@keyframes show-dialog {
  from {
    opacity: 0;
    translate: 0 -0.5em;
  }

  to {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes hide-dialog {
  to {
    opacity: 0;
    translate: 0 -0.5em;
  }
}

@keyframes show-backdrop {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes hide-backdrop {
  to {
    opacity: 0;
  }
}
</style>
