<template>
  <div>
    <center-wrapper>
      <shop-header />
    </center-wrapper>
    <page-with-sidebar>
      <template #sidebar>
        <!-- <product-category-list /> -->
      </template>
      <slot />
    </page-with-sidebar>
  </div>
</template>
