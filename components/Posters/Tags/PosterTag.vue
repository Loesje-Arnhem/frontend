<script lang="ts" setup>
import {
  type SourceFragment,
  type SubjectFragment,
} from '~/graphql/__generated__/graphql'

const props = defineProps<{
  tag: SubjectFragment | SourceFragment
}>()

const selectedTags = useSelectedTags()
const route = useRoute()
const localePath = useLocalePath()

const isSelected = computed(() => {
  return selectedTags.value.some((selectedTag) => {
    return selectedTag.databaseId === props.tag.databaseId
  })
})

const add = () => {
  selectedTags.value.push(props.tag)
}
const remove = () => {
  const tags = [...selectedTags.value]

  selectedTags.value = tags.filter(
    (selectedTag) => selectedTag.databaseId !== props.tag.databaseId,
  )
}

const goToPostersOverview = () => {
  const postersUrl = localePath({ name: 'posters' })
  if (route.path === postersUrl) {
    return
  }
  navigateTo(postersUrl)
}

const toggleTag = () => {
  if (isSelected.value) {
    remove()
  } else {
    add()
  }
  goToPostersOverview()
}
</script>

<template>
  <app-button
    :active="isSelected"
    :is-primary="false"
    css-class="btn-outline"
    @click="toggleTag"
  >
    {{ tag.title }}
  </app-button>
</template>
