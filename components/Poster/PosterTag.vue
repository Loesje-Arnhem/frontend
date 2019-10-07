<template>
  <app-button
    type="button"
    css-class="btn-outline"
    :class="{ 'is-active': isSelected(tag) }"
    :title="tag.name"
    @onclick="selectTag(tag)"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppButton from '@/components/Shared/AppButton.vue'

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
    })
  },
  methods: {
    ...mapActions({
      toggle: 'tags/toggle'
    }),
    isSelected(tag) {
      return this.selectedTags.includes(tag)
    },
    selectTag(tag) {
      this.toggle(tag)
    }
  }
}
</script>
