<template>
  <app-button
    :class="{ 'is-active': isSelectedTag }"
    :is-primary="false"
    css-class="btn-outline"
    @click="toggleTag()"
  >
    {{ tag.name }}
  </app-button>
</template>

<script>
import AppButton from '@/components/Shared/AppButton.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    AppButton
  },
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  computed: {
    isSelectedTag() {
      return this.$store.getters['tags/selectedTagByTagId'](this.tag.tagId)
    }
  },
  methods: {
    ...mapActions({
      toggle: 'tags/toggle'
    }),
    toggleTag() {
      this.toggle(this.tag)
    }
  }
}
</script>
