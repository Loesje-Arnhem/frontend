<template>
  <div class="instagram">
    <div class="wrapper">
      <ul class="list">
        <li v-for="n in 3" :key="n" :class="`list-item-${n}`" class="list-item">
          <a
            :class="`link link-${n}`"
            rel="noopener"
            target="_blank"
            href="https://www.instagram.com/p/B1jl8k5A75L/"
          >
            <app-image
              :src="`/images/instagram/${n}.jpg`"
              :class="`image image-${n}`"
              class="mood"
            />
          </a>
        </li>
      </ul>
      <app-image src="/images/backgrounds/instagram.png" class="background" />
      <div class="button-wrapper">
        <app-button
          rel="noopener"
          href="https://instagram.com/loesjevdposters"
          target="_blank"
          >Volg Loesje op Instagram
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
import AppImage from '@/components/Shared/AppImage.vue'
import AppButton from '@/components/Shared/AppButton.vue'

export default {
  components: {
    AppImage,
    AppButton,
  },
}
</script>

<style lang="postcss" scoped>
.instagram {
  @mixin clearfix;

  min-height: 80vw;
}

.wrapper {
  @mixin center;

  position: relative;
}

.background {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  pointer-events: none;

  @media (--dark-mode) {
    filter: invert(100%);
  }
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

  @mixin center;
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
