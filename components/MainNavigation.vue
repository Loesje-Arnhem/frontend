<template>
  <nav aria-labelledby="menu-title">
    <h2 id="menu-title" class="sr-only">{{ $t('mainNavigation') }}</h2>
    <div class="wrapper">
      <ul ref="menu" class="list">
        <li>
          <nuxt-link to="/"><span class="title">Home</span></nuxt-link>
        </li>
        <li>
          <nuxt-link to="/posters/"
            ><span class="title">Posters</span></nuxt-link
          >
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
          <nuxt-link to="/doe-mee/"
            ><span class="title">Doe mee</span></nuxt-link
          >
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
          <nuxt-link to="/workshops/"
            ><span class="title">Workshop</span></nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/winkeltje/"
            ><span class="title">Winkeltje</span></nuxt-link
          >
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
              <nuxt-link to="/winkeltje/categorie/diversen/"
                >Diversen</nuxt-link
              >
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
      <div
        class="arrow"
        :class="{ active: mounted }"
        :style="{ transform: arrowPosition, width: arrowWidth }"
      />
    </div>
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
      timer: null,
      arrowPosition: 0,
      arrowWidth: 0,
      mounted: false
    }
  },

  watch: {
    $route() {
      this.$nextTick(() => {
        this.setArrowPosition()
      })
    }
  },
  mounted() {
    this.setArrowPosition()
    setTimeout(() => {
      this.mounted = true
    }, 0)
  },
  methods: {
    setArrowPosition() {
      const activeLink = this.$refs.menu.querySelector(
        '.nuxt-link-active[aria-haspopup=true] > .title, .nuxt-link-exact-active > .title'
      )
      if (activeLink) {
        this.arrowPosition = `translate(${activeLink.parentElement.offsetLeft}px, -0.5em)`
        this.arrowWidth = `${activeLink.offsetWidth}px`
      }
    },
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

.wrapper {
  @mixin center;
}

.list {
  @mixin list-reset;
  margin-bottom: 0;
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding-top: 4px;

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

  &:focus {
    outline: none;
  }

  &:focus > .title,
  &:hover > .title {
    box-shadow: 0 2px 0 0 currentColor;
  }
}

.title {
  transition: box-shadow 0.2s ease-out;
}

.btn-show-submenu {
  transform: translate(-0.25em, 0.25em);
  display: none;
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

.arrow {
  height: 4px;
  background: currentColor;
  display: block;

  &.active {
    transition: all 0.2s ease-out;
  }
}
</style>
