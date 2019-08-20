<template>
  <li @mousedown="mouseDown" @mouseup="mouseUp">
    <!-- eslint-disable-next-line -->
    <h2><router-link :to="post.slug" v-html="post.title.rendered" /></h2>
    <post-date :date="post.date" />
    <!-- eslint-disable-next-line -->
    <div class="text" v-html="post.excerpt.rendered"/>
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
      this.$router.push(this.post.slug)
    }
  }
}
</script>

<style lang="postcss" scoped>
li {
  display: flex;
  flex-direction: column;
  padding-bottom: 1em;
  border-bottom: 2px dashed var(--color-white);
  cursor: pointer;

  &:hover .read-more,
  &:focus-within .read-more {
    box-shadow: 0 3px 0 0 var(--color-primary);
    & svg {
      margin-left: 0.25em;
    }
  }
}

a {
  @mixin link-reset;
}

time {
  order: -1;
  font-size: 0.9em;
  color: var(--color-gray-dark);
}

.link-wrapper {
  margin-top: auto;
}
</style>
