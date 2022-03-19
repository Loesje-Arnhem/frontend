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
import { computed, defineComponent } from '@nuxtjs/composition-api'
import useTags from '~/composables/useTags'
export default defineComponent({
  props: {
    tag: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { selectedTags } = useTags()

    const isSelected = computed(() => {
      return selectedTags.value.find(
        (selectedTag) =>
          selectedTag.node.databaseId === props.tag.node.databaseId,
      )
    })

    const add = () => {
      selectedTags.value.push(props.tag)
    }
    const remove = () => {
      const tags = [...selectedTags.value]

      selectedTags.value = tags.filter(
        (selectedTag) =>
          selectedTag.node.databaseId !== props.tag.node.databaseId,
      )
    }

    const toggleTag = () => {
      if (isSelected.value) {
        remove()
      } else {
        add()
      }
    }

    return {
      isSelected,
      toggleTag,
    }
  },
})
</script>
