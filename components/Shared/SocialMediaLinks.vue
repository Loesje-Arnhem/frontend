<template>
  <ul :class="$style.list">
    <li>
      <a
        :href="facebookUrl"
        :class="$style.link"
        rel="noopener"
        target="_blank"
      >
        <icon-facebook aria-hidden="true" width="32" height="32" />
        <span class="sr-only">
          {{ $t('followOn', { title, network: 'Facebook' }) }}
        </span>
      </a>
    </li>
    <li>
      <a :href="twitterUrl" :class="$style.link" rel="noopener" target="_blank">
        <icon-twitter aria-hidden="true" width="32" height="32" />
        <span class="sr-only">
          {{ $t('followOn', { title, network: 'Twitter' }) }}
        </span>
      </a>
    </li>
    <li>
      <a
        :href="linkedinUrl"
        :class="$style.link"
        rel="noopener"
        target="_blank"
      >
        <icon-linkedin aria-hidden="true" width="32" height="32" />
        <span class="sr-only">
          {{ $t('followOn', { title, network: 'LinkedIn' }) }}
        </span>
      </a>
    </li>
    <li>
      <a
        :href="pinterestUrl"
        :class="$style.link"
        rel="noopener"
        target="_blank"
      >
        <icon-pinterest aria-hidden="true" width="32" height="32" />
        <span class="sr-only">
          {{ $t('followOn', { title, network: 'pinterest' }) }}
        </span>
      </a>
    </li>
    <li>
      <a
        :href="instagramUrl"
        :class="$style.link"
        rel="noopener"
        target="_blank"
      >
        <icon-instagram aria-hidden="true" width="32" height="32" />
        <span class="sr-only">
          {{ $t('followOn', { title, network: 'Instagram' }) }}
        </span>
      </a>
    </li>
  </ul>
</template>

<script>
import IconFacebook from '@/assets/icons/facebook.svg'
import IconTwitter from '@/assets/icons/twitter.svg'
import IconLinkedin from '@/assets/icons/linkedin.svg'
import IconPinterest from '@/assets/icons/pinterest.svg'
import IconInstagram from '@/assets/icons/instagram.svg'
import {
  facebookUrl,
  twitterUrl,
  pinterestUrl,
  instagramUrl,
  linkedinUrl,
} from '~/data/socialMedia'

export default {
  components: {
    IconFacebook,
    IconTwitter,
    IconPinterest,
    IconLinkedin,
    IconInstagram,
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
.list {
  @mixin list-reset;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(2.25em, 1fr));
}

.link {
  @mixin link-reset;
}
</style>
