<template>
  <div class="instagram">
    <div class="wrapper">
      <ul class="list">
        <li v-for="n in 3" :key="n" class="list-item" :class="`list-item-${n}`">
          <a
            :class="`link link-${n}`"
            rel="noopener"
            target="_blank"
            href="https://www.instagram.com/p/B1jl8k5A75L/"
          >
            <app-image
              :src="`/images/instagram/${n}.jpg`"
              alt
              class="mood"
              :class="`image image-${n}`"
            />
          </a>
        </li>
      </ul>
    </div>
    <app-image
      src="/images/backgrounds/instagram.png"
      alt=""
      class="background"
    />
    <div class="button-wrapper">
      <app-button
        type="link"
        title="Volg Loesje op Instagram"
        rel="noopener"
        to="https://instagram.com/loesjevdposters"
        target="_blank"
      />
    </div>
  </div>
</template>

<script>
import AppImage from '@/components/Shared/AppImage.vue'
import AppButton from '@/components/Shared/AppButton.vue'

export default {
  components: {
    AppImage,
    AppButton
  }
}
</script>

<style lang="postcss" scoped>
.instagram {
  @mixin block;
  @mixin clearfix;
  min-height: 80vw;
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
  padding: 6vw 0 0 6vw;
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
  width: 15vw;
  display: block;
}

.link-1 {
  transform: rotate(12.5deg) translate(0, 0);
}

.link-2 {
  transform: rotate(7deg) translate(-2vw, 2.5vw);
}

.link-3 {
  transform: rotate(-7deg) translate(-3vw, 3.5vw);
}
</style>
