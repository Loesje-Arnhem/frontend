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
    <app-content
      :title="data.title"
      :content="data.content"
      :video="data.youtubeId"
    />
  </div>
  <center-wrapper size="sm">
    <div class="form widget">
      <h1>1. Formulier</h1>
      <clubcollect-widget
        force-display="true"
        type="form-page"
        path="nl/loesje/jaarlijkse-donatie-campagne"
      />
    </div>
    <div class="widget">
      <h1>2. Overzichtswidget</h1>
      <clubcollect-widget
        type="form"
        path="nl/loesje/jaarlijkse-donatie-campagne"
        goal="10"
        button-color="#000000"
      />
    </div>

    <div class="widget">
      <h1>3. In een modal</h1>

      <dialog ref="dialog" class="dialog">
        <h1>Steun Loesje</h1>

        <button @click="closeDialog" class="btn-close">
          <app-icon icon="close" />
        </button>
        <clubcollect-widget
          force-display="true"
          type="form-page"
          path="nl/loesje/jaarlijkse-donatie-campagne"
        />
      </dialog>
      <app-button @click="showDialog">Toon modal</app-button>
    </div>
  </center-wrapper>
</template>

<style lang="postcss" scoped>
.widget {
  margin-bottom: 4em;
}

.form {
  & h1 {
    padding-inline: calc(10px + 1.07143rem);
  }
}

.dialog {
  padding: 1em 0 0;
  width: 40em;
  max-width: calc(100% - var(--gutter) * 2);

  & h1 {
    margin-inline: calc(10px + 1.07143rem);
  }

  &::backdrop {
    background: rgba(255, 255, 255, 0.5);
  }
}

.btn-close {
  position: absolute;
  right: var(--gutter);
  top: var(--gutter);
  background: var(--color-white);
  color: var(--color-black);
  border-radius: 50%;
  padding: 0.25em;
  font-size: 0.75em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--color-black);
  transition: var(--animation);
  transition-property: color, background-color;

  &:hover {
    background-color: var(--color-black);
    color: var(--color-white);
  }
}
</style>
