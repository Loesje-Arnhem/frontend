<template>
  <nav aria-labelledby="menu-title">
    <h2 id="menu-title" class="sr-only">{{ $t('mainNavigation') }}</h2>
    <ul ref="menu" class="list">
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/posters/">Posters</nuxt-link>
      </li>
      <li
        :class="{ open: isOpen }"
        class="has-popup"
        @mouseover="mouseover"
        @mouseout="mouseout"
      >
        <nuxt-link
          to="/informatie/"
          :aria-expanded="isOpen"
          aria-haspopup="true"
          >Over mij</nuxt-link
        >
        <button
          class="btn-show-submenu"
          :aria-expanded="isOpen"
          @click="toggleMenu"
        >
          <icon-chevron-down
            aria-hidden="true"
            width="20"
            height="20"
            class="icon-chevron-down"
          />
          <span class="sr-only">Toon submenu voor Over mij</span>
        </button>
        <ul class="submenu">
          <li>
            <nuxt-link to="/informatie/wat-wil-loesje/"
              >Wie is Loesje</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/informatie/internationaal/"
              >Loesje in de wijde wereld</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/informatie/nieuws/">Nieuws</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/informatie/copyright/">Copyright</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/informatie/contact-2/">Contact</nuxt-link>
          </li>
        </ul>
      </li>
      <li>
        <nuxt-link to="/doe-mee/">Doe mee</nuxt-link>
        <ul>
          <li>
            <nuxt-link to="/doe-mee/online-meeschrijven/"
              >Schrijf online mee</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/doe-mee/lokale-groepen/"
              >Schrijf mee in je buurt</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/doe-mee/word-lid/">Word lid</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/doe-mee/word-donateur/">Word donateur</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/doe-mee/agenda-2/">Agenda</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/doe-mee/blijf-op-hoogte/"
              >Blijf op de hoogte</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/doe-mee/vacatures/">Vacatures</nuxt-link>
          </li>
        </ul>
      </li>
      <li>
        <nuxt-link to="/workshops/">Workshop</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/winkeltje/">Winkeltje</nuxt-link>
        <ul>
          <li>
            <nuxt-link to="/winkeltje/categorie/kleding/">Kleding</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/winkeltje/categorie/kalenders/"
              >Kalenders en agenda&#8217;s</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/winkeltje/categorie/boeken/">Boeken</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/winkeltje/categorie/diversen/">Diversen</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/winkeltje/categorie/kaarten/">Kaarten</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/winkeltje/categorie/aanbieding/"
              >Aanbieding</nuxt-link
            >
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import IconChevronDown from '~/assets/icons/chevron-down.svg'

export default {
  components: {
    IconChevronDown
  },
  data() {
    return {
      isOpen: false,
      timer: null
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    mouseover() {
      this.isOpen = true
      clearTimeout(this.timer)
    },
    mouseout() {
      this.timer = setTimeout(() => {
        this.isOpen = false
      }, 250)
    }
  }
}
</script>

<style lang="postcss" scoped>
nav {
  @mixin color-negative;
  @mixin notch;

  font-family: var(--font-family-headings);
  text-transform: uppercase;
  font-size: 1.4em;
  margin-bottom: 1em;
}

.list {
  @mixin list-reset;
  @mixin center;
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  & ul {
    display: none;
  }
}

.menu-item {
  display: flex;
}

.menu-link {
  &[aria-haspopup='true'] {
    padding-right: 0.25em;
  }
}

a {
  @mixin link-reset;
  display: block;
  padding: 0.25em 0;
}

.btn-show-submenu {
  transform: translate(-0.25em, 0.25em);
}

.submenu {
  margin-left: 1em;

  display: none;
  background: var(--color-bg-page);
  position: absolute;
  top: 100%;
  margin-left: 0;
  padding: 0 0.5em;
  white-space: nowrap;

  @nest .open & {
    display: block;
  }
}
</style>
