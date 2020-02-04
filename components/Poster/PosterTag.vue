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
import AppButton from '@/components/Shared/AppButton.vue'
import { mapGetters, mapActions } from 'vuex'
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
    ...mapGetters({
      selectedTags: 'tags/selectedTags'
    }),
    isSelected() {
      return this.selectedTags.includes(this.tag)
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
