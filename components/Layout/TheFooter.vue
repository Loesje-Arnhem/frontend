<script lang="ts" setup>
const { socialMedia } = useAppConfig()
const { facebookUrl, twitterUrl, pinterestUrl, instagramUrl, linkedinUrl }
  = socialMedia
</script>

<template>
  <footer :class="$style.footer">
    <center-wrapper>
      <div :class="$style.wrapper">
        <company-address />
        <rss-feed-links />
        <app-stores />

        <div :class="$style['follow-us']">
          <social-media-links
            :title="$t('followMeOn')"
            :facebook="facebookUrl"
            :twitter="twitterUrl"
            :pinterest="pinterestUrl"
            :instagram="instagramUrl"
            :linkedin="linkedinUrl"
          />
        </div>
        <div :class="$style['mood-wrapper']">
          <app-image
            :width="210"
            :height="240"
            :class="$style.mood"
            src="/images/casette-player.png"
            sizes="sm:50vw md:33vw lg:25vw xl:300"
          />
        </div>
      </div>
    </center-wrapper>
  </footer>
</template>

<style lang="postcss" module>
@import '~/assets/css/media-queries/media-queries.css';

.footer {
  @mixin block;
  @mixin color-negative;

  position: relative;

  h2 {
    margin-bottom: var(--spacing-xs);
  }
}

.wrapper {
  display: grid;
  grid-gap: 2em var(--gutter);

  @media (--viewport-sm) {
    grid-template-columns: repeat(2, 1fr);
    padding-bottom: 8em;
  }

  @media (--viewport-md) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.mood-wrapper {
  transform: rotate(3deg);

  @media (--viewport-sm) {
    position: absolute;
    bottom: var(--gutter);
    right: var(--gutter);
  }
}

.btn-store {
  @mixin link-reset;
}

.icon-store {
  fill: inherit;
  width: 100%;
  height: auto;
  margin-bottom: 0.5em;
}
</style>
