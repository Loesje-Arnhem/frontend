<template>
  <app-button
    :class="{ 'is-active': isSelected }"
    :is-primary="false"
    css-class="btn-outline"
    @click="toggleTag()"
  >
    {{ tag.name }}
  </app-button>
</template>

<script>
import { mapActions } from 'vuex'
import AppButton from '~/components/Shared/AppButton.vue'
export default {
  components: {
    AppButton,
  },
  props: {
    tag: {
      type: Object,
      required: true,
    },
    taxonomy: {
      type: String,
      required: true,
      validator(value) {
        return ['subject', 'source'].includes(value)
      },
    },
  },
  computed: {
    isSelected() {
      return this.$store.getters['tags/isSelected'](this.tag.id)
    },
  },
  methods: {
    ...mapActions({
      toggle: 'tags/toggle',
    }),
    toggleTag() {
      const tag = {
        ...this.tag,
        taxonomy: this.taxonomy,
      }
      this.toggle(tag)
    },
  },
}
</script>
