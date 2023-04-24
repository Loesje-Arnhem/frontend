<script lang="ts" setup>
import IconBars from '~/assets/icons/bars.svg'
import IconChevronDown from '~/assets/icons/chevron-down.svg'
import IconChevronLeft from '~/assets/icons/chevron-left.svg'
import IconChevronRight from '~/assets/icons/chevron-right.svg'
import IconChevronUp from '~/assets/icons/chevron-up.svg'
import IconClose from '~/assets/icons/close.svg'
import IconEnvelope from '~/assets/icons/envelope.svg'
import IconFacebook from '~/assets/icons/facebook.svg'
import IconHeartO from '~/assets/icons/heart-o.svg'
import IconHeart from '~/assets/icons/heart.svg'
import IconInstagram from '~/assets/icons/instagram.svg'
import IconLinkedin from '~/assets/icons/linkedin.svg'
import IconLogo from '~/assets/icons/logo.svg'
import IconPdf from '~/assets/icons/pdf.svg'
import IconPhone from '~/assets/icons/phone.svg'
import IconPinterest from '~/assets/icons/pinterest.svg'
import IconPlayStore from '~/assets/icons/play-store.svg'
import IconSearch from '~/assets/icons/search.svg'
import IconTag from '~/assets/icons/tag.svg'
import IconTwitter from '~/assets/icons/twitter.svg'
import IconYoutube from '~/assets/icons/youtube.svg'

const props = withDefaults(
  defineProps<{
    icon: string
    width?: number
    height?: number
    title?: string | null
  }>(),
  {
    width: 24,
    height: 24,
    title: null,
  },
)

const iconComponent = computed(() => {
  switch (props.icon) {
    case 'bars':
      return IconBars
    case 'chevron-down':
      return IconChevronDown
    case 'chevron-left':
      return IconChevronLeft
    case 'chevron-right':
      return IconChevronRight
    case 'chevron-up':
      return IconChevronUp
    case 'close':
      return IconClose
    case 'envelope':
      return IconEnvelope
    case 'facebook':
      return IconFacebook
    case 'heart-o':
      return IconHeartO
    case 'heart':
      return IconHeart
    case 'instagram':
      return IconInstagram
    case 'linkedin':
      return IconLinkedin
    case 'logo':
      return IconLogo
    case 'pdf':
      return IconPdf
    case 'phone':
      return IconPhone
    case 'pinterest':
      return IconPinterest
    case 'play-store':
      return IconPlayStore
    case 'search':
      return IconSearch
    case 'tag':
      return IconTag
    case 'twitter':
      return IconTwitter
    case 'youtube':
      return IconYoutube
  }
})
</script>

<template>
  <component
    :is="`svgo-${icon}`"
    :width="width"
    :height="height"
    v-bind="$attrs"
  />
</template>
