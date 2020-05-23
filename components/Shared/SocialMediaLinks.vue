<template>
  <div>
    <h2>{{ title }}</h2>
    <ul :class="$style.list">
      <li v-if="facebook">
        <a :href="facebook" :class="$style.link" rel="noopener" target="_blank">
          <icon-facebook aria-hidden="true" width="32" height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Facebook</span>
          </span>
        </a>
      </li>
      <li v-if="twitter">
        <a :href="twitter" :class="$style.link" rel="noopener" target="_blank">
          <icon-twitter aria-hidden="true" width="32" height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Twitter</span>
          </span>
        </a>
      </li>
      <li v-if="linkedin">
        <a :href="linkedin" :class="$style.link" rel="noopener" target="_blank">
          <icon-linkedin aria-hidden="true" width="32" height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">LinkedIn</span>
          </span>
        </a>
      </li>
      <li v-if="pinterest">
        <a
          :href="pinterest"
          :class="$style.link"
          rel="noopener"
          target="_blank"
        >
          <icon-pinterest aria-hidden="true" width="32" height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Pinterest</span>
          </span>
        </a>
      </li>
      <li v-if="instagram">
        <a
          :href="instagram"
          :class="$style.link"
          rel="noopener"
          target="_blank"
        >
          <icon-instagram aria-hidden="true" width="32" height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Instagram</span>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import IconFacebook from '~/assets/icons/facebook.svg'
import IconTwitter from '~/assets/icons/twitter.svg'
import IconLinkedin from '~/assets/icons/linkedin.svg'
import IconPinterest from '~/assets/icons/pinterest.svg'
import IconInstagram from '~/assets/icons/instagram.svg'

export default {
  components: {
    IconFacebook,
    IconTwitter,
    IconPinterest,
    IconLinkedin,
    IconInstagram,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      default: null,
    },
    twitter: {
      type: String,
      default: null,
    },
    pinterest: {
      type: String,
      default: null,
    },
    instagram: {
      type: String,
      default: null,
    },
    linkedin: {
      type: String,
      default: null,
    },
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
