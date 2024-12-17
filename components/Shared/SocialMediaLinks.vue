<script lang="ts" setup>
defineProps<{
  title: string;
  facebook?: string;
  twitter?: string;
  pinterest?: string;
  instagram?: string;
  linkedin?: string;
  bluesky?: string;
}>();
</script>

<template>
  <div class="social-media">
    <h2>{{ title }}</h2>
    <ul class="list">
      <li v-if="facebook">
        <nuxt-link :to="facebook" class="link" external target="_blank">
          <app-icon icon="facebook" :width="32" :height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Facebook</span>
          </span>
        </nuxt-link>
      </li>
      <li v-if="bluesky">
        <nuxt-link :to="bluesky" class="link" external target="_blank">
          <app-icon icon="bluesky" :width="32" :height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">BlueSky</span>
          </span>
        </nuxt-link>
      </li>
      <li v-if="twitter">
        <nuxt-link :to="twitter" class="link" external target="_blank">
          <app-icon icon="twitter" :width="32" :height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Twitter</span>
          </span>
        </nuxt-link>
      </li>
      <li v-if="linkedin">
        <nuxt-link :to="linkedin" class="link" external target="_blank">
          <app-icon icon="linkedin" :width="32" :height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">LinkedIn</span>
          </span>
        </nuxt-link>
      </li>
      <li v-if="instagram">
        <nuxt-link :to="instagram" class="link" external target="_blank">
          <app-icon icon="instagram" :width="32" :height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Instagram</span>
          </span>
        </nuxt-link>
      </li>
      <li v-if="pinterest">
        <nuxt-link :to="pinterest" class="link" external target="_blank">
          <app-icon icon="pinterest" :width="32" :height="32" />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Pinterest</span>
          </span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;

  display: flex;
  gap: 0.5em;
}

.link {
  @mixin link-reset;
}
</style>
