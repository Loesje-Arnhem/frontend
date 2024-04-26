<script lang="ts" setup>
const { t } = useI18n()
const usps = [
  t('participateToActivities'),
  t('joinWriting'),
  t('receiveDiscountInTheShop'),
]
</script>

<template>
  <box-wrapper id="become-member" :title="$t('becomeMember')">
    <ul class="list">
      <li v-for="usp in usps" :key="usp" class="list-item">
        <app-image
          class="check"
          :width="27"
          :height="27"
          src="/images/check.png"
          sizes="xs:27px"
        />
        {{ usp }}
      </li>
    </ul>
    <app-button to="/doe-mee/word-lid/">
      {{ $t('iWillJoin') }}
    </app-button>
    <!-- <app-image
      class="image"
      :width="167"
      :height="144"
      src="/images/megaphone.png"
    /> -->
  </box-wrapper>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;

  margin-bottom: 1em;
}

.check {
  flex: 0 1 auto;
  width: auto;
}

.list-item {
  gap: 0.25em;
  padding: 0 0 0.5rem;
  display: flex;
}
</style>
