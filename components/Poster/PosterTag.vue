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
import { mapActions, mapGetters } from 'vuex'
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
  },
  computed: {
    ...mapGetters({
      selectedTags: 'tags/selectedTags',
    }),
    isSelected() {
      return this.selectedTags.includes(this.tag)
    },
  },
  methods: {
    ...mapActions({
      toggle: 'tags/toggle',
    }),
    toggleTag() {
      this.toggle(this.tag)
    },
  },
}
</script>
