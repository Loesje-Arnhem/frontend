<template>
  <form method="get" @keyup.esc="reset" @submit.prevent="onSubmit">
    <legend class="sr-only">Zoeken naar posters</legend>
    <div :class="$style['input-wrapper']">
      <form-input-text
        id="search"
        v-model="$v.search.$model"
        :class="$style.search"
        title="Zoek op tekst"
        type="search"
        name="search"
        placeholder="Zoek op tekst"
        autocomplete="off"
        @input="onInput"
        @keyupDown="onArrowDown"
        @keyupUp="onArrowUp"
      />
      <button type="submit" :class="$style['btn-submit']">
        <icon-search aria-hidden="true" width="32" height="32" />
        <span class="sr-only">Zoeken</span>
      </button>
      <div v-if="isOpen" :class="$style.autocomplete">
        <ul :class="$style.list">
          <li
            v-for="(result, index) in resultsWithHighlightText"
            :key="result.id"
          >
            <!-- eslint-disable -->
            <router-link
              :class="[{ [$style.active]: index === arrowCounter }, $style['btn-result']]"
              :to="result.url"
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
import { mapActions } from 'vuex'
import IconSearch from '~/assets/icons/search.svg'
import SearchQuery from '~/graphql/Posters/Search.gql'
import FormInputText from '~/components/Forms/FormInputText.vue'

export default {
  components: {
    IconSearch,
    FormInputText,
  },
  validations: {
    search: {
      required,
      minLength: minLength(2),
    },
  },
  data() {
    return {
      search: '',
      arrowCounter: -1,
    }
  },
  apollo: {
    results: {
      query: SearchQuery,
      variables() {
        return {
          search: this.search,
        }
      },
      debounce: 200,
      skip: true,
      update: (data) => data.posters.edges,
    },
  },
  computed: {
    resultsWithHighlightText() {
      if (!this.results) {
        return []
      }
      return this.results.map((item) => {
        const { title, slug, id } = item.node
        return {
          id,
          url: `/posters/${slug}`,
          value: title,
          // make current searchterm bold with a regex
          title: title.replace(
            new RegExp(`(^|)(${this.search})(|$)`, 'ig'),
            '$1<strong>$2</strong>$3',
          ),
        }
      })
    },
    isOpen() {
      return !this.$v.search.$invalid && this.resultsWithHighlightText.length
    },
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside)
    this.search = this.$store.state.tags.search
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    ...mapActions({
      addSearch: 'tags/search',
    }),
    onInput() {
      this.$apollo.queries.results.skip = this.$v.search.$invalid
    },
    goToPoster(result) {
      this.$router.push(result.url)
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
    onSubmit() {
      if (this.arrowCounter > -1) {
        this.goToPoster(this.resultsWithHighlightText[this.arrowCounter])
      } else {
        this.submit()
      }
    },
    submit() {
      this.isValid = this.$v.search.minLength
      if (this.isValid) {
        this.close()
        this.addSearch(this.search)
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.close()
      }
    },
    reset() {
      this.addSearch('')
      this.search = ''
      this.close()
    },
    close() {
      this.$apollo.queries.results.skip = true
      this.arrowCounter = -1
      this.results = []
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
    padding: 0.75em 2em 0.75em 0.75em;
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
