<script lang="ts" setup>
import { ITag } from '~~/interfaces/IContent'

const props = defineProps<{
  tag: ITag
}>()

const selectedTags = useSelectedTags()
const router = useRouter()
const route = useRoute()
const localePath = useLocalePath()

const isSelected = computed(() => {
  return selectedTags.value.some((selectedTag) => {
    return selectedTag.id === props.tag.id
  })
})

const add = () => {
  selectedTags.value.push(props.tag)
}
const remove = () => {
  const tags = [...selectedTags.value]

  selectedTags.value = tags.filter(
    (selectedTag) => selectedTag.id !== props.tag.id,
  )
}

const goToPostersOverview = () => {
  const postersUrl = localePath({ name: 'posters' })
  if (route.path === postersUrl) {
    return
  }
  router.push(postersUrl)
}

const toggleTag = () => {
  console.log(isSelected.value)
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
