<template>
  <form method="get" class="form" @keyup.esc="reset" @submit.prevent="submit">
    <legend class="sr-only">{{ $t('title') }}</legend>
    <div class="input-wrapper">
      <form-input-text
        id="search"
        type="search"
        name="search"
        autocomplete="off"
        :value="value"
        class="search"
        :title="$t('title')"
        v-bind="$attrs"
        @input="input"
        @keyup-down="onArrowDown"
        @keyup-up="onArrowUp"
      />
      <div class="buttons">
        <button
          v-if="value.length"
          type="button"
          class="btn-reset"
          @click="reset"
        >
          <app-icon icon="close" width="24" height="24" title="Sluiten" />
        </button>
        <button type="submit" class="btn-submit">
          <app-icon icon="search" width="24" height="24" title="Zoeken" />
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
            <router-link
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
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  inheritAttrs: false,

  props: {
    results: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default() {
        return this.$t('title')
      },
    },
  },
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
            new RegExp(`(^|)(${this.value})(|$)`, 'ig'),
            '$1<strong>$2</strong>$3',
          ),
        }
      })
    },
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    input(value) {
      this.showList = true
      this.$emit('input', value)
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
      } else {
        this.close()
        this.$emit('submit', this.value)
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.close()
      }
    },
    reset() {
      this.$emit('input', '')
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

<style scoped lang="postcss">
.form {
  margin-bottom: 1em;
}

.input-wrapper {
  position: relative;
}

.buttons {
  position: absolute;
  top: 0.5em;
  right: 0.25em;
  padding: 0.25em;
  display: flex;
}

.btn-reset {
  margin-right: 0.5em;
}

.autocomplete {
  position: absolute;
  background: rgb(255 255 255 / 90%);
  z-index: var(--z-autocomplete);
  left: 0;
  right: 0;
  top: 100%;
  border-color: var(--color-black);
  border-style: solid;
  border-width: 0 2px 2px;
}

.search {
  & >>> .label {
    @mixin sr-only;
  }

  & >>> .input {
    padding: 0.75em 2em 0.75em 0.75em;
    border-image-source: none !important;
  }

  & >>> ::-webkit-search-decoration,
  & >>> ::-webkit-search-cancel-button,
  & >>> ::-webkit-search-results-button,
  & >>> ::-webkit-search-results-decoration {
    display: none;
  }
}

.list {
  @mixin list-reset;
}

.btn-result {
  @mixin link-reset;

  width: 100%;
  text-align: left;
  display: block;
  font-size: 1em;
  padding: 0.5em 0.75em;

  &.active,
  &:focus,
  &:hover {
    background: var(--color-black);
    color: var(--color-white);
  }
}
</style>

<i18n>
{
  "nl": {
    "title": "Zoeken"
  }
}
</i18n>
