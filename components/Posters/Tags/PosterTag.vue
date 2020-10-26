<template>
  <app-button
    :class="{ 'is-active': isSelected }"
    :is-primary="false"
    css-class="btn-outline"
    @click="toggleTag()"
  >
    {{ tag.node.name }}
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
  },
  computed: {
    isSelected() {
      return this.$store.getters['tags/isSelected'](this.tag.node.databaseId)
    },
  },
  methods: {
    ...mapActions('tags', ['add', 'remove']),
    toggleTag() {
      const tag = { ...this.tag }
      if (this.isSelected) {
        this.remove(tag.node.databaseId)
      } else {
        this.add(tag)
        this.$router.push({
          path: '/posters',
        })
      }
    },
  },
}
</script>
