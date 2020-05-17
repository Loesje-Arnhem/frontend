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
      return this.$store.getters['tags/isSelected'](this.tag.node.id)
    },
  },
  methods: {
    ...mapActions({
      add: 'tags/add',
      remove: 'tags/remove',
    }),
    toggleTag() {
      const tag = this.tag
      tag.node.taxonomy = this.taxonomy
      if (this.isSelected) {
        this.remove(tag.node.id)
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
