<template>
  <li class="list-item" @mousedown="mouseDown" @mouseup="mouseUp">
    <h2 class="title">
      <!-- eslint-disable-next-line -->
      <router-link :to="`/nieuws/${post.slug}`" v-html="post.title" />
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
  </li>
</template>

<script>
import PostDate from '@/components/PostDate.vue'
import IconChevronRight from '@/assets/icons/chevron-right.svg'

export default {
  components: {
    PostDate,
    IconChevronRight
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      down: null
    }
  },
  methods: {
    mouseUp() {
      const up = +new Date()
      if (up - this.down < 200) {
        this.goToPost()
      }
    },
    mouseDown() {
      this.down = +new Date()
    },
    goToPost() {
      this.$router.push(`/nieuws/${this.post.slug}`)
    }
  }
}
</script>

<style lang="postcss" scoped>
.list-item {
  cursor: pointer;

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
