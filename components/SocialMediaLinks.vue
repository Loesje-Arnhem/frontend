<template>
  <ul class="list">
    <li v-if="socialMedia.facebook">
      <a
        :href="socialMedia.facebook"
        class="link"
        rel="noopener"
        target="_blank"
      >
        <icon-facebook aria-hidden="true" width="32" height="32" />
        <span class="sr-only">
          {{ $t('followOn', { title, network: 'Facebook' }) }}
        </span>
      </a>
    </li>
    <li v-if="socialMedia.twitter">
      <a
        :href="socialMedia.twitter"
        class="link"
        rel="noopener"
        target="_blank"
      >
        <icon-twitter aria-hidden="true" width="32" height="32" />
        <span class="sr-only">
          {{ $t('followOn', { title, network: 'Twitter' }) }}
        </span>
      </a>
    </li>
    <li v-if="socialMedia.linkedin">
      <a
        :href="socialMedia.linkedin"
        class="link"
        rel="noopener"
        target="_blank"
      >
        <icon-linkedin aria-hidden="true" width="32" height="32" />
        <span class="sr-only">
          {{ $t('followOn', { title, network: 'LinkedIn' }) }}
        </span>
      </a>
    </li>
    <li v-if="socialMedia.pinterest">
      <a
        :href="socialMedia.pinterest"
        class="link"
        rel="noopener"
        target="_blank"
      >
        <icon-pinterest aria-hidden="true" width="32" height="32" />
        <span class="sr-only">
          {{ $t('followOn', { title, network: 'pinterest' }) }}
        </span>
      </a>
    </li>
    <li v-if="socialMedia.instagram">
      <a
        :href="socialMedia.instagram"
        class="link"
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

export default {
  components: {
    IconFacebook,
    IconTwitter,
    IconPinterest,
    IconLinkedin,
    IconInstagram
  },
  props: {
    title: {
      type: String,
      required: true
    },
    socialMedia: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(2.25em, 1fr));
}

.link {
  @mixin link-reset;
}
</style>
