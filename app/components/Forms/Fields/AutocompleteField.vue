<script>
export default defineComponent({
  inheritAttrs: false,

  props: {
    results: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'submit', 'update:modelValue', 'submit'],
  data() {
    return {
      arrowCounter: -1,
      showList: false,
    }
  },

  computed: {
    resultsWithHighlightText() {
      return this.results.map((item) => {
        return {
          ...item,
          // make current searchterm bold with a regex
          title: item.title.replace(
            new RegExp(`(^|)(${this.modelValue})(|$)`, 'ig'),
            '$1<strong>$2</strong>$3',
          ),
        }
      })
    },
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  unmounted() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    input() {
      this.showList = true
      this.$emit('update:modelValue', event.target.value)
    },
    selectItem(result) {
      this.$router.push(result.uri)
    },
    onArrowDown() {
      if (this.arrowCounter < this.resultsWithHighlightText.length - 1) {
        this.arrowCounter = this.arrowCounter + 1
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },
    submit() {
      if (this.arrowCounter > -1) {
        this.selectItem(this.resultsWithHighlightText[this.arrowCounter])
      }
      else {
        this.close()
        this.$emit('submit', this.modelValue)
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.close()
      }
    },
    reset() {
      this.$emit('update:modelValue', '')
      this.$emit('submit', '')
      this.close()
    },
    close() {
      this.arrowCounter = -1
      this.showList = false
    },
  },
})
</script>

<template>
  <search role="search">
    <form
      method="get"
      class="form"
      @keyup.esc="reset"
      @submit.prevent="submit"
    >
      <legend class="sr-only">
        {{ $t("search") }}
      </legend>
      <div class="wrapper">
        <div class="input-wrapper">
          <input-text-field
            id="search"
            type="search"
            name="search"
            autocomplete="off"
            :model-value="modelValue"
            class="search"
            :title="$t('search')"
            v-bind="$attrs"
            @input="input"
            @keyup-down="onArrowDown"
            @keyup-up="onArrowUp"
          />
        </div>

        <div class="buttons">
          <button
            v-if="modelValue.length"
            type="button"
            class="btn-reset"
            @click="reset"
          >
            <app-icon
              icon="close"
              :width="24"
              :height="24"
              title="Sluiten"
            />
          </button>
          <button
            type="submit"
            class="btn-submit"
          >
            <app-icon
              icon="search"
              :width="24"
              :height="24"
              title="Zoeken"
            />
          </button>
        </div>
        <div
          v-if="resultsWithHighlightText.length && showList"
          class="autocomplete"
        >
          <ul class="list">
            <li
              v-for="(result, index) in resultsWithHighlightText"
              :key="result.id"
            >
              <nuxt-link
                :class="{ active: index === arrowCounter }"
                class="btn-result"
                :to="result.uri"
                v-html="result.title"
              />
            </li>
          </ul>
        </div>
      </div>
    </form>
  </search>
</template>

<style lang="css" scoped>
.form {
  margin-block-end: 1em;
}

.wrapper {
  position: relative;
}

.buttons {
  position: absolute;
  inset-block-start: 0.5em;
  inset-inline-end: 0.25em;
  display: flex;
  padding: 0.25em;
}

.btn-reset {
  margin-inline-end: 0.5em;
}

.autocomplete {
  position: absolute;
  inset-block-start: 100%;
  inset-inline: 0;
  z-index: var(--z-autocomplete);
  background: rgb(255 255 255 / 90%);
  border-color: var(--color-black);
  border-style: solid;
  border-width: 0 2px 2px;
}

.input-wrapper {
  & :deep(.label) {
    @mixin sr-only;
  }

  & :deep(.input) {
    padding: 0.75em 2em 0.75em 0.75em;
    border-image-source: none !important;
  }

  & :deep(::-webkit-search-decoration),
  & :deep(::-webkit-search-cancel-button),
  & :deep(::-webkit-search-results-button),
  & :deep(::-webkit-search-results-decoration) {
    display: none;
  }
}

.list {
  @mixin list-reset;
}

.btn-result {
  @mixin link-reset;

  display: block;
  inline-size: 100%;
  padding: 0.5em 0.75em;
  font-size: 1em;
  text-align: start;

  &.active,
  &:focus,
  &:hover {
    color: var(--color-white);
    background: var(--color-black);
  }
}
</style>
