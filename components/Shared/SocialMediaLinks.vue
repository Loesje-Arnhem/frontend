<script lang="ts" setup>
defineProps<{
  title: string
  facebook?: string
  twitter?: string
  pinterest?: string
  instagram?: string
  linkedin?: string
}>()
</script>

<template>
  <div class="social-media">
    <h2>{{ title }}</h2>
    <ul class="list">
      <li v-if="facebook">
        <a
          :href="facebook"
          class="link"
          rel="noopener"
          target="_blank"
        >
          <app-icon
            icon="facebook"
            :width="32"
            :height="32"
          />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Facebook</span>
          </span>
        </a>
      </li>
      <li v-if="twitter">
        <a
          :href="twitter"
          class="link"
          rel="noopener"
          target="_blank"
        >
          <app-icon
            icon="twitter"
            :width="32"
            :height="32"
          />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Twitter</span>
          </span>
        </a>
      </li>
      <li v-if="linkedin">
        <a
          :href="linkedin"
          class="link"
          rel="noopener"
          target="_blank"
        >
          <app-icon
            icon="linkedin"
            :width="32"
            :height="32"
          />
          <span class="sr-only">
            {{ title }}
            <span lang="en">LinkedIn</span>
          </span>
        </a>
      </li>
      <li v-if="instagram">
        <a
          :href="instagram"
          class="link"
          rel="noopener"
          target="_blank"
        >
          <app-icon
            icon="instagram"
            :width="32"
            :height="32"
          />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Instagram</span>
          </span>
        </a>
      </li>
      <li v-if="pinterest">
        <a
          :href="pinterest"
          class="link"
          rel="noopener"
          target="_blank"
        >
          <app-icon
            icon="pinterest"
            :width="32"
            :height="32"
          />
          <span class="sr-only">
            {{ title }}
            <span lang="en">Pinterest</span>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;

  padding-top: 0.5em;
  display: flex;
  gap: 0.5em;
}

.link {
  @mixin link-reset;
}
</style>
