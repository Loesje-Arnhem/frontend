<template>
  <div v-if="page" class="page">
    <center-wrapper>
      <div :class="$style.wrapper">
        <app-content
          :title="page.title"
          :content="page.content"
          :class="$style.content"
        />
        <div>
          <div :class="$style['video-wrapper']">
            <iframe
              loading="lazy"
              :class="$style.video"
              title="Workshop creatief schrijven met Loesje"
              width="500"
              height="281"
              src="https://www.youtube.com/embed/1Pr__G4H4sg?feature=oembed"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
            <img src="/images/television.png" alt="" :class="$style.frame" />
          </div>
        </div>
      </div>
    </center-wrapper>
    <form-workshop />
    <related-posters-section :related-posters="page.relatedPosters" />
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script>
import { workshopsPageId } from '~/data/pages'
import PageByIdQuery from '~/graphql/Pages/PageById.gql'
import getSeoMetaData from '~/utils/seo'

export default {
  async asyncData({ app }) {
    const { defaultClient } = app.apolloProvider
    const result = await defaultClient.query({
      query: PageByIdQuery,
      variables: {
        id: workshopsPageId,
      },
    })
    return {
      page: result.data.page,
    }
  },
  head() {
    return getSeoMetaData(this.page.seo)
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  @mixin block;

  display: grid;
  grid-gap: var(--gutter);
  grid-template-columns: 2fr 1fr;
}

.video {
  width: 100%;
  height: 100%;
  top: 30%;
  left: 3%;
  right: 10%;
}

.content :global(.video) {
  display: none;
}

.video-wrapper {
  position: relative;
  aspect-ratio: 4 / 3;
}

.frame {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
}
</style>
