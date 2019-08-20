<template>
  <nav aria-labelledby="menu-title">
    <h2 id="menu-title" class="sr-only" tabindex="-1">
      {{ $t('mainNavigation') }}
    </h2>
    <ul ref="menu">
      <li>
        <nuxt-link id="menu" to="/">
          <span class="title">
            {{ $t('home') }}
          </span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/tour">
          <span class="title">{{ $t('tour') }}</span>
          <app-badge :amount="list.length" />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/albums">
          <span class="title">{{ $t('albums') }}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/videos">
          <span class="title">{{ $t('videos') }}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/biography">
          <span class="title">{{ $t('biography') }}</span>
        </nuxt-link>
      </li>
    </ul>
    <div
      class="arrow"
      :style="{ '-webkit-transform': arrowPosition, transform: arrowPosition }"
    />
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppBadge from '@/components/AppBadge.vue'

export default {
  components: {
    AppBadge
  },
  data() {
    return {
      arrowPosition: 0
    }
  },
  computed: {
    ...mapState('tour', ['list']),
    step() {
      return this.$store.state.step
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

    this.setTours()
  },
  methods: {
    setArrowPosition() {
      const { menu } = this.$refs
      const activeLink = menu.querySelector('.nuxt-link-exact-active')
      if (activeLink) {
        const { parentElement } = activeLink
        this.arrowPosition = `translateY(${parentElement.offsetTop}px)`
        this.arrowWidth = `${activeLink.offsetWidth}px`
      }
    },
    ...mapActions({
      setTours: 'tour/set'
    })
  }
}
</script>

<style lang="postcss" scoped>
nav {
  position: relative;
}

ul {
  @mixin list-reset;

  margin-bottom: 1em;
  border-top: 1px dashed var(--color-gray);

  @media (--navigation-position-left) {
    border-top: 0;
  }
}

.title {
  transition: box-shadow 0.1s ease-out;
  &.link-active {
    box-shadow: 0 2px 0 0 var(--color-primary);
  }
}

a {
  @mixin link-reset;

  align-items: center;
  display: flex;
  position: relative;
  text-decoration: none;
  font-size: 1.2em;
  line-height: 1.1;
  padding: 0.45em 0;
  border-bottom: 1px dashed var(--color-gray);

  &.nuxt-link-exact-active .title {
    box-shadow: 0 2px 0 0 var(--color-primary);
  }

  &:hover {
    text-decoration: none;
    & .title {
      box-shadow: 0 3px 0 0 var(--color-primary);
    }
  }
  @media (--navigation-position-left) {
    border-bottom: 0;
    padding: 0.25em 0;
  }
}

.arrow {
  @media (--navigation-position-left) {
    display: block;
    position: absolute;
    top: 0;
    right: -2em;
    transition: transform 0.2s ease-out;

    &::after {
      position: absolute;
      display: block;
      content: '';
      border-top: 0.75em solid transparent;
      border-bottom: 0.75em solid transparent;
      border-left: 1em solid var(--color-secondary);
    }

    &::before {
      position: absolute;
      display: block;
      content: '';
      margin-top: -3px;
      border-top: calc(0.75em + 3px) solid transparent;
      border-bottom: calc(0.75em + 3px) solid transparent;
      border-left: calc(1em + 6px) solid #fff;
    }
  }
}
</style>
