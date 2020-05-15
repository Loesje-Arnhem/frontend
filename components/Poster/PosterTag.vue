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
      return this.$store.getters['tags/isSelected'](
        this.tag.databaseId,
        this.taxonomy,
      )
    },
  },
  methods: {
    ...mapActions({
      addSubject: 'tags/addSubject',
      addSource: 'tags/addSource',
      removeSubject: 'tags/removeSubject',
      removeSource: 'tags/removeSource',
    }),
    toggleTag() {
      if (this.isSelected) {
        if (this.taxonomy === 'subject') {
          this.removeSubject(this.tag.databaseId)
        } else {
          this.removeSource(this.tag.databaseId)
        }
      } else if (this.taxonomy === 'source') {
        this.addSource(this.tag.databaseId)
      } else {
        this.addSubject(this.tag.databaseId)
      }
    },
  },
}
</script>
