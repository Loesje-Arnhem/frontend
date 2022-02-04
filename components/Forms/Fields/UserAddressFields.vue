<template>
  <form-fieldset title="Adresgegevens" class="fields">
    <form-input-text
      :id="`${id}-country`"
      :value="form.country"
      title="Land"
      class="country"
      name="country"
      autocomplete="country"
      @input="$emit('input', 'country', $event)"
    />
    <form-input-text
      :id="`${id}-postcode`"
      :value="form.postcode"
      title="Postcode"
      class="postcode"
      name="postcode"
      autocomplete="postal-code"
      @input="$emit('input', 'postcode', $event)"
    />
    <form-input-text
      :id="`${id}-houseNumber`"
      :value="form.houseNumber"
      title="Nr"
      type="number"
      class="houseNumber"
      name="houseNumber"
    />
    <form-input-text
      :id="`${id}-houseNumberAddition`"
      :value="form.houseNumberAddition"
      title="Toev"
      class="houseNumberAddition"
      name="houseNumberAddition"
    />
    <form-input-text
      :id="`${id}-street`"
      :value="form.street"
      title="Straat"
      class="street"
      name="street"
    />
    <form-input-text
      :id="`${id}-city`"
      :value="form.city"
      title="Plaats"
      class="city"
      name="city"
      @input="$emit('input', 'city', $event)"
    />
    <div class="button" @click="test">test</div>
  </form-fieldset>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import usePostcode from '~/composables/usePostcode'

export default {
  props: {
    isShipping: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { loading, checkPostcode, form } = usePostcode()
    const id = computed(() => {
      return props.isShipping ? `shipping` : 'form'
    })

    const test = () => {
      checkPostcode()
    }
    return {
      form,
      id,
      checkPostcode,
      loading,
      test,
    }
  },
}
</script>

<style lang="postcss" scoped>
.firstName,
.lastName,
.postcode,
.street,
.city {
  grid-column: span 2;
}

.email,
.country,
.companyName {
  grid-column: span 4;
}
</style>
