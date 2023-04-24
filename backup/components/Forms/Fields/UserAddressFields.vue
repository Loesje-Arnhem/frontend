<template>
  <form-fieldset
    title="Adresgegevens"
    class="fields"
  >
    <form-select
      :id="`${id}-country`"
      :value="form.country"
      title="Land"
      name="country"
      class="country"
      autocomplete="country"
      :options="countries"
      @input="$emit('input', 'country', $event)"
      @change="$emit('change', 'country', $event)"
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
      class="house-number"
      name="houseNumber"
    />
    <form-input-text
      :id="`${id}-houseNumberAddition`"
      :value="form.houseNumberAddition"
      title="Toev"
      class="house-number-addition"
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
    <div
      class="button"
      @click="test"
    >
      Haal gegevens op
    </div>
  </form-fieldset>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import usePostcode from '~/composables/usePostcode'
import countries from '~/data/countries'

export default defineComponent({

  props: {
    isShipping: {
      type: Boolean,
      default: false,
    },
  },
    emits: ['input', 'change'],
  setup(props) {
    const { loading, checkPostcode, form } = usePostcode()
    const id = computed(() => {
      return props.isShipping ? `shipping` : 'form'
    })

    const test = () => {
      checkPostcode()
    }
    return {
      countries,
      form,
      id,
      checkPostcode,
      loading,
      test,
    }
  },
})
</script>

<style lang="postcss" scoped>
.street,
.city {
  grid-column: span 2;
}

.country {
  grid-column: span 4;
}
</style>
