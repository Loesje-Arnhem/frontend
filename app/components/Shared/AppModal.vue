<script lang="ts" setup>
defineProps<{
  title: string;
}>();

const emit = defineEmits(["close"]);

const isHidden = ref(false);
const dialog = useTemplateRef("dialog");

const startClosingAnimation = () => {
  isHidden.value = true;
};

const close = () => {
  if (isHidden.value && dialog.value) {
    isHidden.value = false;
    dialog.value.close();
  }
};

const afterClosing = () => {
  emit("close");
};

onMounted(() => {
  if (dialog.value) {
    dialog.value.showModal();
    dialog.value.addEventListener("close", afterClosing);
  }
});

onUnmounted(() => {
  if (dialog.value) {
    dialog.value.removeEventListener("close", afterClosing);
  }
});
</script>

<template>
  <dialog
    ref="dialog"
    class="dialog"
    :class="{ 'is-hidden': isHidden }"
    @animationend="close"
  >
    <div class="header">
      <h1 class="title">{{ title }}</h1>
      <button class="btn-close" autofocus @click="startClosingAnimation">
        <app-icon icon="close" class="icon" />
      </button>
    </div>
    <slot />
  </dialog>
</template>

<style scoped>
.dialog {
  width: calc(100% - var(--gutter) * 2);
  max-width: var(--container-width-md);
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
  top: 0;
  background-color: var(--color-white);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5em;
  border-bottom: 1px solid var(--color-black);
  z-index: 9;
  margin-bottom: 0.5em;
  padding-block: var(--gutter);
}

.title {
  margin-bottom: 0;
}

.btn-close {
  flex: 0 0 auto;
}

.icon {
  width: 2em;
}

@keyframes show-dialog {
  from {
    translate: 0 -0.5em;
    opacity: 0;
  }

  to {
    translate: 0 0;
    opacity: 1;
  }
}

@keyframes hide-dialog {
  to {
    translate: 0 -0.5em;
    opacity: 0;
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
