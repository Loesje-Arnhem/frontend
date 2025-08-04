<script lang="ts" setup>
import type { FeaturedImage } from "~/types/Content";

withDefaults(
  defineProps<{
    sizes?: string;
  }>(),
  {
    sizes: "100vw xs:270px",
  },
);

const addTrailingZeroToValue = (value: number) => {
  if (value < 10) {
    return `0${value}`;
  } else {
    return value.toString();
  }
};

const getDate = () => {
  const date = new Date();
  const month = addTrailingZeroToValue(date.getMonth() + 1);
  const day = addTrailingZeroToValue(date.getDate());
  return `${date.getFullYear()}${month}${day}`;
};

const poster = ref<FeaturedImage | null>(null);

const { execute } = useFetch("/api/posters/daily-poster", {
  onResponse({ response }) {
    localStorage.setItem(
      "daily-poster",
      JSON.stringify({
        ...response._data,
        date: getDate(),
      }),
    );
    poster.value = response._data;
  },
  immediate: false,
});

onMounted(async () => {
  const posterFromStorage = await localStorage.getItem("daily-poster");
  if (posterFromStorage) {
    const parsedData = JSON.parse(posterFromStorage);
    if (parsedData.date === getDate()) {
      poster.value = parsedData;
    } else {
      await execute();
    }
  } else {
    await execute();
  }
});
</script>

<template>
  <app-image v-if="poster" v-bind="poster" :sizes="sizes" />
</template>
