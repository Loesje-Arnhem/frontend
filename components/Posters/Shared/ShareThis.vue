<script lang="ts" setup>
const props = defineProps<{
  title?: string | null;
  image?: string | null;
}>();

const route = useRoute();
const { baseUrl } = useAppConfig();

const supportsShareAPI = ref(false);

const link = computed(() => {
  return `${baseUrl}${route.fullPath}`;
});

onMounted(() => {
  /* @ts-expect-error:next-line */
  supportsShareAPI.value = import.meta.client && window?.navigator?.canShare;
});
const twitter = computed(() => {
  return `https://twitter.com/share?text=${props.title}&url=${link.value}`;
});
const facebook = computed(() => {
  return `https://www.facebook.com/sharer.php?u=${link.value}&p=${props.title}`;
});
const pinterest = computed(() => {
  return `https://pinterest.com/pin/create/button/?url=${link.value}&media=${props.image}&description=${props.title}`;
});

const bluesky = computed(() => {
  return `https://bsky.app/intent/compose?text=${link.value}`;
});

const share = () => {
  window.navigator.share({
    title: props.title || "",
    url: link.value,
    text: props.title || "",
  });
};
</script>

<template>
  <app-button v-if="supportsShareAPI" @click="share">
    Deze poster delen
  </app-button>
  <social-media-links
    v-else
    :title="$t('shareThePosterOn')"
    :twitter="twitter"
    :facebook="facebook"
    :pinterest="pinterest"
    :bluesky="bluesky"
  />
</template>
