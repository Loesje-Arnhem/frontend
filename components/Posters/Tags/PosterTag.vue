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

<script lang="ts">
import {
  computed,
  defineComponent,
  useRouter,
  PropType,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import useTags from '~/composables/useTags'
import { ITag } from '~/interfaces/ITag'
export default defineComponent({
  props: {
    tag: {
      type: Object as PropType<ITag>,
      required: true,
    },
  },
  setup(props) {
    const { selectedTags } = useTags()
    const router = useRouter()
    const route = useRoute()
    const { app } = useContext()

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

    const goToPostersOverview = () => {
      const postersUrl = app.localePath({ name: 'posters' })
      if (route.value.path === postersUrl) {
        return
      }
      router.push(postersUrl)
    }

    const toggleTag = () => {
      if (isSelected.value) {
        remove()
      } else {
        add()
      }
      goToPostersOverview()
    }

    return {
      isSelected,
      toggleTag,
    }
  },
})
</script>
