<template>
  <form method="get" @keyup.esc="reset" @submit.prevent="submit">
    <legend class="sr-only">{{ $t('title') }}</legend>
    <div :class="$style['input-wrapper']">
      <form-input-text
        id="search"
        :value="$v.value.$model"
        :class="$style.search"
        :title="$t('title')"
        type="search"
        name="search"
        v-bind="$attrs"
        autocomplete="off"
        @input="input"
        @keyup-down="onArrowDown"
        @keyup-up="onArrowUp"
      />
      <button type="submit" :class="$style['btn-submit']">
        <icon-search aria-hidden="true" width="32" height="32" />
        <span class="sr-only">{{ $t('title') }}</span>
      </button>
      <div v-if="resultsWithHighlightText.length" :class="$style.autocomplete">
        <ul :class="$style.list">
          <li
            v-for="(result, index) in resultsWithHighlightText"
            :key="result.id"
          >
            <!-- eslint-disable vue/no-v-html -->
            <router-link
              :class="[
                { [$style.active]: index === arrowCounter },
                $style['btn-result'],
              ]"
              :to="result.uri"
              v-html="result.title"
            />
            <!-- eslint-enable -->
          </li>
        </ul>
      </div>
    </div>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import IconSearch from '~/assets/icons/search.svg'
import FormInputText from '~/components/Forms/FormInputText.vue'

export default {
  components: {
    IconSearch,
    FormInputText,
  },
  inheritAttrs: false,
  validations: {
    value: {
      required,
      minLength: minLength(2),
    },
  },
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
    }
  },

  computed: {
    resultsWithHighlightText() {
      if (!this.results) {
        return []
      }
      return this.results.map((item) => {
        const { title } = item.node
        return {
          ...item.node,
          // make current searchterm bold with a regex
          title: title.replace(
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
      this.$emit('input', value)
    },
    selectItem(result) {
      this.$router.push(result.uri)
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length - 1) {
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
        this.isValid = this.$v.search.minLength
        if (this.isValid) {
          this.close()
          this.$emit('submit', this.value)
        }
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.close()
      }
    },
    reset() {
      this.$emit('submit', '')
      this.close()
    },
    close() {
      this.arrowCounter = -1
      this.$emit('close')
    },
  },
}
</script>

<style module lang="postcss">
.form {
  margin-bottom: 1em;
}

.input-wrapper {
  position: relative;
}

.btn-submit {
  position: absolute;
  top: 0.25em;
  right: 0.25em;
  padding: 0.25em 0.25em;
}

.icon-search {
  @mixin icon 1.25em;
}

.autocomplete {
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  z-index: 9;
  left: 0;
  right: 0;
  top: 100%;
  border-color: var(--color-black);
  border-style: solid;
  border-width: 0 1px 1px;
}

.search {
  & :global(.label) {
    @mixin sr-only;
  }

  & :global(.input) {
    padding-right: 2em 0.75em 0.75em;
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
  padding: 0.5em 1em;

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
