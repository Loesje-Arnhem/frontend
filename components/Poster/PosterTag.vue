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
import addItemMutation from '~/graphql/local/AddToSelectedTags.gql'
import removeFromSelectedTagsMutation from '~/graphql/local/RemoveFromSelectedTags.gql'
import selectedTagsQuery from '~/graphql/local/SelectedTags.gql'

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
  apollo: {
    selectedTags: {
      query: selectedTagsQuery
    }
  },
  computed: {
    isSelected() {
      return this.selectedTags.find(
        selectedTag => selectedTag.id === this.tag.id
      )
    }
  },
  methods: {
    toggleTag() {
      if (this.isSelected) {
        this.$apollo.mutate({
          mutation: removeFromSelectedTagsMutation,
          variables: { id: this.tag.id }
        })
      } else {
        this.$apollo.mutate({
          mutation: addItemMutation,
          variables: { id: this.tag.id, tagId: this.tag.tagId }
        })
      }
    }
  }
}
</script>
