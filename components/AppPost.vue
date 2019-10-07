<template>
  <clickable-list-item class="list-item" :url="url">
    <h2 class="title">
      <!-- eslint-disable-next-line -->
      <router-link :to="url" v-html="post.title" />
    </h2>
    <post-date :date="post.date" />
    <!-- eslint-disable-next-line -->
    <div class="text" v-html="post.excerpt" />
    <div class="link-wrapper">
      <span class="read-more">
        {{ $t('readMore') }}
        <icon-chevron-right aria-hidden="true" width="16" height="16" />
      </span>
    </div>
  </clickable-list-item>
</template>

<script>
import PostDate from '@/components/PostDate.vue'
import IconChevronRight from '@/assets/icons/chevron-right.svg'
import ClickableListItem from '@/components/shared/ClickableListItem.vue'

export default {
  components: {
    PostDate,
    IconChevronRight,
    ClickableListItem
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    url() {
      return `/over-mij/nieuws/${this.post.slug}`
    }
  }
}
</script>

<style lang="postcss" scoped>
.list-item {
  &:not(:last-child) {
    margin: 0 0 3em;
  }

  &:hover .read-more,
  &:focus-within .read-more {
    box-shadow: 0 3px 0 0 var(--color-black);
    & svg {
      margin-left: 0.25em;
    }
  }
}

.title {
  margin-bottom: 0;
}

a {
  @mixin link-reset;
}

time {
  font-size: 0.9em;
  color: var(--color-gray-dark);
}

.link-wrapper {
  margin-top: auto;
}
</style>
