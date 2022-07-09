<template>
  <div class="social-media">
    <h2>{{ title }}</h2>
    <ul class="list">
      <li v-if="facebook">
        <a :href="facebook" class="link" rel="noopener" target="_blank">
          <app-icon icon="facebook" width="32" height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Facebook</span>
          </span>
        </a>
      </li>
      <li v-if="twitter">
        <a :href="twitter" class="link" rel="noopener" target="_blank">
          <app-icon icon="twitter" width="32" height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Twitter</span>
          </span>
        </a>
      </li>
      <li v-if="linkedin">
        <a :href="linkedin" class="link" rel="noopener" target="_blank">
          <app-icon icon="linkedin" width="32" height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">LinkedIn</span>
          </span>
        </a>
      </li>
      <li v-if="instagram">
        <a :href="instagram" class="link" rel="noopener" target="_blank">
          <app-icon icon="instagram" width="32" height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Instagram</span>
          </span>
        </a>
      </li>
      <li v-if="pinterest">
        <a :href="pinterest" class="link" rel="noopener" target="_blank">
          <app-icon icon="pinterest" width="32" height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Pinterest</span>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
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
})
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
