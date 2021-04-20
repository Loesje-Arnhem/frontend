<template>
  <footer :class="$style.footer">
    <div :class="$style.wrapper">
      <quick-links />

      <company-address />

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
          width="210"
          height="240"
          :class="$style.mood"
          :src="require('~/assets/images/casette-player.png')"
        />
      </div>
    </div>
  </footer>
</template>

<script>
import SocialMediaLinks from '~/components/Shared/SocialMediaLinks.vue'
import AppStores from '~/components/Footer/AppStores.vue'
import CompanyAddress from '~/components/Footer/CompanyAddress.vue'
import QuickLinks from '~/components/Footer/QuickLinks.vue'
import AppImage from '~/components/Shared/AppImage.vue'
import {
  facebookUrl,
  twitterUrl,
  pinterestUrl,
  instagramUrl,
  linkedinUrl,
} from '~/data/socialMedia'

export default {
  components: {
    QuickLinks,
    SocialMediaLinks,
    AppStores,
    CompanyAddress,
    AppImage,
  },
  data() {
    return {
      facebookUrl,
      twitterUrl,
      pinterestUrl,
      instagramUrl,
      linkedinUrl,
    }
  },
}
</script>

<style lang="postcss" module>
.footer {
  @mixin block;
  @mixin color-negative;

  position: relative;
}

.wrapper {
  @mixin center;

  display: grid;
  grid-gap: 2em var(--gutter);

  @media (--viewport-sm) {
    grid-template-columns: repeat(2, 1fr);
    padding-bottom: 8em;
  }
  @media (--viewport-lg) {
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

<i18n>
{
  "nl": {
    "followMeOnNetwork": "Bekijk %{title} op",
    "followMeOn": "Volg me op"
  }
}
</i18n>
