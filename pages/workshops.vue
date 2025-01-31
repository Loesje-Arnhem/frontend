<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: "/workshop-creatief-schrijven",
  },
});
const { pageIds, clubCollect } = useAppConfig();

const { data } = await useAsyncData(`page-workshop`, () =>
  $fetch("/api/pages/page", {
    params: {
      id: pageIds.workshops,
    },
  }),
);

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

useMeta({
  title: data.value.title,
  description: data.value.description,
  image: data.value.featuredImage,
});

const { onLoaded, proxy } = useScript<{
  setupWidgets: () => void
}>({
  src: clubCollect.widgets,
  async: true,
  referrerpolicy: false,
  crossorigin: false,

}, {
  use() {
    return window.ClubCollect
  },
  stub() {
    return {
      setupWidgets: () => {},
    }
  }
})



onMounted(() => {
  onLoaded(({ setupWidgets }) => {
    setupWidgets()
  })
})

const modal = useTemplateRef('modal')

const showmodal = () => {
  if (modal.value) {
    modal.value.showModal()
  }
}

const closeModal = () => {
  if (modal.value) {
    modal.value.close()
  }
}

</script>

<template>
  <div v-if="data">
    <app-content
      :title="data.title"
      :content="data.content"
      :video="data.youtubeId"
    />

  <app-button @click="showmodal">Meld je aan!</app-button>

    <dialog ref="modal" class="modal">
      <div class="header">
        <h1 class="title">Meld je aan voor de workshop</h1>
        <button class="btn-close" @click="closeModal" autofocus>
          <app-icon icon="close" class="icon" />
        </button>
      </div>
      <clubcollect-widget force-display='true' type='form-page' path='nl/loesje/loesje-workshop-voor-jezelf' />
    </dialog>

    <related-products-section
      v-if="data.relatedProducts"
      :title="data.relatedProducts.title"
      :product-ids="data.relatedProducts.productIds"
    />

    <related-posters-section
      :poster-ids="data.relatedPosters.posterIds"
      :search="data.relatedPosters.search"
      :subjects="data.relatedPosters.subjects"
      :title="data.relatedPosters.title"
    />
  </div>
</template>


<style lang="postcss" scoped>
.modal {
  width: calc(100% - var(--gutter) * 2);
  max-width: var(--container-width-md);
  padding: 0 var(--gutter) 5em;

  &::backdrop {
    background: var(--color-black);
    opacity: 0.75;
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
</style>