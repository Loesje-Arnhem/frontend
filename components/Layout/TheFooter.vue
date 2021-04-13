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

        <div :class="$style['mood-wrapper']">
          <app-image
            :class="$style.mood"
            :src="require('~/assets/images/casette-player.png')"
          />
        </div>
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
}

.wrapper {
  @mixin center;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14em, 1fr));
  grid-gap: var(--gutter);
}

.mood-wrapper {
  margin-top: 2em;
  text-align: right;
  transform: rotate(3deg);
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
