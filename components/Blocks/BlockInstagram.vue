<template>
  <div class="instagram">
    <center-wrapper class="wrapper">
      <ul class="list">
        <li v-for="n in 3" :key="n" :class="`list-item-${n}`" class="list-item">
          <a
            :class="`link link-${n}`"
            rel="noopener"
            target="_blank"
            href="https://www.instagram.com/p/B1jl8k5A75L/"
          >
            <img
              :src="`/images/instagram/${n}.jpg`"
              :class="`image image-${n}`"
              class="mood"
            />
          </a>
        </li>
      </ul>
      <img src="/images/backgrounds/instagram.png" class="background" />
      <div class="button-wrapper">
        <app-button
          button-tag="a"
          rel="noopener"
          href="https://instagram.com/loesjevdposters"
          target="_blank"
        >
          Volg Loesje op Instagram
        </app-button>
      </div>
    </center-wrapper>
  </div>
</template>

<style lang="postcss" scoped>
.instagram {
  @mixin clearfix;

  min-height: 80vw;
}

.wrapper {
  position: relative;
}

.background {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  pointer-events: none;
}

.list {
  @mixin list-reset;

  padding: 7em 0 0 2em;
  display: flex;
  flex-wrap: wrap;
}

.button-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: right;
}

.list-item {
  flex: 0 0 25%;
}

.list-item-1,
.list-item-2,
.list-item-3 {
  flex: 0 0 33%;
}

.link {
  width: 50%;
  display: block;
}

.link-1 {
  transform: rotate(12.5deg) translate(0, 0);
}

.link-2 {
  transform: rotate(7deg) translate(-1em, 3em);
}

.link-3 {
  transform: rotate(-7deg) translate(-2em, 4em);
}
</style>
