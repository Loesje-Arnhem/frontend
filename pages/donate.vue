<script setup lang="ts">
defineI18nRoute({
  paths: {
    nl: '/doneren',
  },
})

const { pageIds } = useAppConfig()

const { data } = await useAsyncData(`page-donate`, () =>
  $fetch('/api/pages/page', {
    params: {
      id: pageIds.donate,
    },
  }),
)

useHead({
  script: [
    {
      src: 'https://app.clubcollect.com/widgets.js',
      defer: true,
      async: true,
    },
  ],
})

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

useMeta({
  title: data.value.title,
  description: data.value.description,
  image: data.value.featuredImage,
})

const dialog = ref<HTMLDialogElement | null>(null)

const showDialog = () => {
  if (!dialog.value) return
  dialog.value.showModal()
}

const closeDialog = () => {
  if (!dialog.value) return
  dialog.value.close()
}
</script>

<template>
  <div v-if="data">
    <app-content :title="data.title" :content="data.content" :video="data.youtubeId" />
  </div>
  <center-wrapper size="md">
    <div class="widget">
      <h1>Bendeleden</h1>
      <iframe class="form" name="clubbase-signup-form"
        src="https://app.clubbase.io/signup/f73cc96d-dbbd-44b7-866d-ff565dd6e864?id=09bb8665-9a85-4d0a-8f09-119029c6029e" />
    </div>

    <div class="widget">
      <h1>Donateurs</h1>
      <iframe class="form" name="clubbase-signup-form"
        src="https://app.clubbase.io/signup/f73cc96d-dbbd-44b7-866d-ff565dd6e864?id=8e12b804-83e1-46a7-84a3-f38018a8dd42" />
    </div>

  </center-wrapper>
</template>

<style lang="postcss" scoped>
.form {
  border: 0;
  width: 100%;
  height: 100%;
  min-height: 3000px;
  overflow-y: scroll;
}

.widget {
  margin-bottom: 4em;
}
</style>
