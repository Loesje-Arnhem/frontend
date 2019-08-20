<template>
  <!-- prettier-ignore -->
  <div class="social-bar">
    Deel de poster op:
    <a
:href="facebookUrl"
       rel="noopener"
target="_blank"
>
      <Icon
icon="facebook"
            class="icon"
:title="'Deel ' + poster.title.rendered + ' op Facebook'"
/>
    </a>
    <a
:href="twitterUrl"
       rel="noopener"
target="_blank"
>
      <Icon
icon="twitter"
            class="icon"
:title="'Deel ' + poster.title.rendered + '  op Twitter'"
/>
    </a>
    <a
:href="pinterestUrl"
       rel="noopener"
target="_blank"
>
      <Icon
        icon="pinterest"
        class="icon"
        :title="'Deel ' + poster.title.rendered + ' op Pinterest'"
      />
    </a>
  </div>
</template>

<script>
import Icon from '@/components/Shared/Icon.vue';

export default {
  components: {
    Icon,
  },
  props: {
    poster: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    twitterUrl() {
      return `https://twitter.com/share?text=${
        this.poster.title.rendered
      }&url=${this.poster.link}`;
    },
    facebookUrl() {
      return `https://www.facebook.com/sharer.php?u=${this.poster.link}&p=${
        this.poster.title.rendered
      }`;
    },
    pinterestUrl() {
      return `https://pinterest.com/pin/create/button/?url=${
        this.poster.link
      }&media=${this.poster.fimg_url}&description=${
        this.poster.title.rendered
      }`;
    },
  },
};
</script>

<style scoped>
.social-bar {
  display: flex;
  align-self: end;
  align-items: center;
  padding: 0.5em 1em;
}

a {
  margin-left: 0.5em;
}

.icon {
  @mixin icon 2em;
  display: block;
}
</style>
