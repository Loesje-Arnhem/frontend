export default () => {
  const cartState = useCartState();

  const totalProducts = computed(() => {
    if (!cartState.value) {
      return 0;
    }
    return cartState.value.itemsCount;
  });

  return {
    totalProducts,
  };
};
