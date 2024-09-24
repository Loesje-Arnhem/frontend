<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    to: string;
    external?: boolean;
  }>(),
  {
    external: false,
  },
);

const down: Ref<number | null> = ref(null);

const mouseDown = (event: MouseEvent) => {
  const target = event.target as Element;
  if (target.nodeName === "A" || target.parentNode?.nodeName === "a") {
    down.value = null;
  } else {
    down.value = +new Date();
  }
};
const mouseUp = () => {
  if (!down.value) {
    return;
  }
  const up = +new Date();
  if (up - down.value < 200) {
    navigateTo(props.to, {
      external: props.external,
    });
  }
};
</script>

<template>
  <li class="list-item" @mousedown.left="mouseDown" @mouseup.left="mouseUp">
    <slot />
  </li>
</template>

<style lang="postcss" scoped>
.list-item {
  cursor: pointer;

  &:hover,
  &:focus-within {
    & :deep(.read-more .icon) {
      margin-left: 0.25em;
    }
  }
}
</style>
