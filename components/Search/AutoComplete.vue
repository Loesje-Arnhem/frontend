<template>
  <form method="get" @keyup.esc="close" @submit.prevent="onSubmit">
    <label for="search" class="sr-only">Zoek op tekst, onderwerp of bron</label>
    <div class="input-wrapper">
      <input
        id="search"
        v-model="search"
        type="search"
        name="search"
        placeholder="Zoek op tekst, onderwerp of bron"
        autofocus
        autocomplete="off"
        @input="onChange"
        @keyup.down="onArrowDown"
        @keyup.up="onArrowUp"
      />

      <button type="submit" class="btn-submit">Zoeken</button>
    </div>

    <div v-show="isOpen" class="autocomplete">
      <ul v-if="results.length > 0">
        <li v-for="(result, index) in results" :key="index">
          <button
            :class="{ 'is-active': index === arrowCounter }"
            type="button"
            class="btn-result"
            @click="goToPoster(result)"
          >
            <!-- eslint-disable-next-line -->
            <span v-html="result.title" />
          </button>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    hasSearched: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isOpen: false,
      formError: '',
      search: '',
      arrowCounter: -1,
      results: [],
      isValid: true
    }
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    async onChange() {
      // only autocomplete at min 3 character
      if (this.search.length < 3) {
        this.close()
        return
      }
      const response = await this.$axios.$get('wp/v2/poster', {
        params: {
          search: this.search
        }
      })
      this.results = response.data.map(item => {
        const title = item.title.rendered
        return {
          slug: item.slug,
          value: title,
          // make current searchterm bold with a regex
          title: title.replace(
            new RegExp(`(^|)(${this.search})(|$)`, 'ig'),
            '$1<strong>$2</strong>$3'
          )
        }
      })
      this.isOpen = this.results.length > 0
    },
    goToPoster(result) {
      this.$router.push({ name: 'Poster', params: { slug: result.slug } })
    },
    setResult(result) {
      this.search = result
      this.submit()
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
        this.goToPoster(this.results[this.arrowCounter])
      } else {
        this.setResult(this.search)
      }
    },
    submit() {
      this.isValid = this.$v.search.minLength
      if (this.isValid) {
        this.$emit('onSearch', this.search)
        this.close()
      }
    },
    clearSearch(event) {
      this.close()
      if (event.key !== 'Escape') this.$emit('onSearch', this.search)
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.close()
      }
    },
    close() {
      this.isOpen = false
      this.arrowCounter = -1
    }
  }
}
</script>

<style scoped>
form {
  margin-bottom: 1em;
  position: relative;
}

.input-wrapper {
  background: var(--color-white);
  display: flex;
  align-items: center;
  border: 2px solid var(--gray-dark);
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
  background: var(--color-white);
  z-index: 9;
  left: 0;
  right: 0;
  top: 100%;
  border-color: var(--gray);
  border-style: solid;
  border-width: 0 1px 1px;
}

ul {
  @mixin list-reset;
}

.btn-result {
  width: 100%;
  text-align: left;
  display: block;
  font-size: 1em;
  padding: 0.5em 1em;

  &.is-active,
  &:hover {
    background: var(--color-black);
    color: var(--color-white);
  }
}

.alert {
  margin-bottom: 0;
}
</style>
