<template>
  <footer :class="$style.footer">
    <center-wrapper>
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
          <img
            alt=""
            width="210"
            height="240"
            :class="$style.mood"
            loading="lazy"
            src="/images/casette-player.png"
            quality="80"
            fit="inside"
            sizes="sm:50vw md:33vw lg:25vw xl:300 xxl:500"
          />
        </div>
      </div>
    </center-wrapper>
  </footer>
</template>

<script>
import SocialMediaLinks from '~/components/Shared/SocialMediaLinks.vue'
import AppStores from '~/components/Footer/AppStores.vue'
import CompanyAddress from '~/components/Footer/CompanyAddress.vue'
import QuickLinks from '~/components/Footer/QuickLinks.vue'

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
