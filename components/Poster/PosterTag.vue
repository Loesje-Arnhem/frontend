<template>
  <app-button
    :class="{ 'is-active': isSelected(tag) }"
    :is-primary="false"
    css-class="btn-outline"
    @click="selectTag(tag)"
  >
    {{ tag.name }}
  </app-button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppButton from '@/components/Shared/AppButton.vue'
import addItemMutation from '~/graphql/local/AddToSelectedTags.gql'

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
      this.$apollo.mutate({
        mutation: addItemMutation,
        variables: { id: tag.id, tagId: tag.tagId, text: tag.name }
      })
    }
  }
}
</script>
