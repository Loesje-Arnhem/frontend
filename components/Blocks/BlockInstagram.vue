<template>
  <div class="instagram">
    <div class="wrapper">
      <ul class="list">
        <li v-for="n in 10" :key="n" class="list-item">
          <app-image :src="`/images/instagram/${n}.jpg`" alt class="mood" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AppImage from '@/components/Shared/AppImage.vue'

export default {
  components: {
    AppImage
  }
}
</script>

<style lang="postcss" scoped>
.instagram {
  @mixin block;
  @mixin clearfix;
}

.wrapper {
  @mixin center;
}

.list {
  @mixin list-reset;
  display: flex;
  flex-wrap: wrap;
}

.list-item {
  flex: 0 0 25%;
}
</style>
