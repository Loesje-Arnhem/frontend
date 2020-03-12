<template>
  <form method="get" @keyup.esc="reset" @submit.prevent="onSubmit">
    <legend class="sr-only">Zoeken naar posters</legend>
    <label for="search" class="sr-only">Zoek op tekst</label>
    <div class="input-wrapper">
      <input
        id="search"
        v-model="$v.search.$model"
        type="search"
        name="search"
        placeholder="Zoek op tekst"
        autocomplete="off"
        @input="onInput"
        @keyup.down="onArrowDown"
        @keyup.up="onArrowUp"
      />
      <button type="submit" class="btn-submit">
        <icon-search aria-hidden="true" width="32" height="32" />
        <span class="sr-only">Zoeken</span>
      </button>
    </div>

    <div v-if="isOpen" class="autocomplete">
      <ul>
        <li
          v-for="(result, index) in resultsWithHighlightText"
          :key="result.id"
        >
          <!-- eslint-disable -->
          <router-link
            :class="{ active: index === arrowCounter }"
            class="btn-result"
            :to="result.url"
            v-html="result.title"
          />
          <!-- eslint-enable -->
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import IconSearch from '@/assets/icons/search.svg'
import PostersQuery from '~/graphql/PostersAutocomplete.gql'

export default {
  components: {
    IconSearch,
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
      query: PostersQuery,
      variables() {
        return {
          where: {
            search: this.search,
          },
        }
      },
      debounce: 200,
      skip: true,
      update: data => data.posters.edges,
    },
  },
  computed: {
    resultsWithHighlightText() {
      if (!this.results) {
        return []
      }
      return this.results.map(item => {
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
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
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
        this.$emit('onSearch', this.search)
        this.close()
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.reset()
      }
    },
    reset() {
      this.search = ''
      this.$apollo.queries.results.skip = true
      this.arrowCounter = -1
    },
  },
}
</script>

<style scoped lang="postcss">
form {
  margin-bottom: 1em;
  position: relative;
}

.input-wrapper {
  background: var(--color-white);
  display: flex;
  align-items: center;
  border: 2px solid var(--color-gray-dark);
  padding: 0 1.5em 0 0.75em;

  &:focus-within {
    border-color: var(--color-black);
  }
}

input {
  border: 0;
  flex: 1 1 auto;
  padding: 0.75em 0;
}

.btn-submit {
  margin: 0.25em;
  padding: 0.25em 0.25em;
}

.icon-search {
  @mixin icon 1.25em;
}

.btn-submit {
  order: -1;
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

ul {
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
  &:hover {
    background: var(--color-black);
    color: var(--color-white);
  }
}

.alert {
  margin-bottom: 0;
}
</style>
