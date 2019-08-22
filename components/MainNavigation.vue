<template>
  <nav aria-labelledby="menu-title">
    <h2 id="menu-title" class="sr-only">{{ $t('mainNavigation') }}</h2>
    <ul ref="menu" class="list">
      <li id="menu-item-30772">
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li id="menu-item-30771">
        <nuxt-link to="/posters/">Posters</nuxt-link>
      </li>
      <li id="menu-item-25255">
        <nuxt-link to="/informatie/">Over mij</nuxt-link>
        <ul id="menu-item-30757">
          <li>
            <nuxt-link to="/informatie/wat-wil-loesje/"
              >Wie is Loesje</nuxt-link
            >
          </li>
          <li id="menu-item-30758">
            <nuxt-link to="/informatie/internationaal/"
              >Loesje in de wijde wereld</nuxt-link
            >
          </li>
          <li id="menu-item-30759">
            <nuxt-link to="/informatie/nieuws/">Nieuws</nuxt-link>
          </li>
          <li id="menu-item-30760">
            <nuxt-link to="/informatie/copyright/">Copyright</nuxt-link>
          </li>
          <li id="menu-item-30761">
            <nuxt-link to="/informatie/contact-2/">Contact</nuxt-link>
          </li>
        </ul>
      </li>
      <li id="menu-item-25260">
        <nuxt-link to="/doe-mee/">Doe mee</nuxt-link>
        <ul id="menu-item-30763">
          <li>
            <nuxt-link to="/doe-mee/online-meeschrijven/"
              >Schrijf online mee</nuxt-link
            >
          </li>
          <li id="menu-item-30766">
            <nuxt-link to="/doe-mee/lokale-groepen/"
              >Schrijf mee in je buurt</nuxt-link
            >
          </li>
          <li id="menu-item-30765">
            <nuxt-link to="/doe-mee/word-lid/">Word lid</nuxt-link>
          </li>
          <li id="menu-item-30767">
            <nuxt-link to="/doe-mee/word-donateur/">Word donateur</nuxt-link>
          </li>
          <li id="menu-item-30764">
            <nuxt-link to="/doe-mee/agenda-2/">Agenda</nuxt-link>
          </li>
          <li id="menu-item-30768">
            <nuxt-link to="/doe-mee/blijf-op-hoogte/"
              >Blijf op de hoogte</nuxt-link
            >
          </li>
          <li id="menu-item-30769">
            <nuxt-link to="/doe-mee/vacatures/">Vacatures</nuxt-link>
          </li>
        </ul>
      </li>
      <li id="menu-item-30770">
        <nuxt-link to="/workshops/">Workshop</nuxt-link>
      </li>
      <li id="menu-item-47191">
        <nuxt-link to="/winkeltje/">Winkeltje</nuxt-link>
        <ul id="menu-item-47832">
          <li>
            <nuxt-link to="/winkeltje/categorie/kleding/">Kleding</nuxt-link>
          </li>
          <li id="menu-item-47848">
            <nuxt-link to="/winkeltje/categorie/kalenders/"
              >Kalenders en agenda&#8217;s</nuxt-link
            >
          </li>
          <li id="menu-item-47834">
            <nuxt-link to="/winkeltje/categorie/boeken/">Boeken</nuxt-link>
          </li>
          <li id="menu-item-47833">
            <nuxt-link to="/winkeltje/categorie/diversen/">Diversen</nuxt-link>
          </li>
          <li id="menu-item-47835">
            <nuxt-link to="/winkeltje/categorie/kaarten/">Kaarten</nuxt-link>
          </li>
          <li id="menu-item-47836">
            <nuxt-link to="/winkeltje/categorie/aanbieding/"
              >Aanbieding</nuxt-link
            >
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style lang="postcss" scoped>
nav {
  @mixin color-negative;

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

a {
  @mixin link-reset;
  display: block;
  padding: 0.25em 0;
}
</style>
