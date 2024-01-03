<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { CountriesEnum } from '~/graphql/__generated__/graphql'
import type { Option } from '~/types/Option'

const emits = defineEmits([
  'update:country',
  'update:postcode',
  'update:street',
  'update:house-number',
  'update:city',
  'update:house-number-suffix',
])

const props = defineProps<{
  id: string
  city: string
  postcode: string
  street: string
  houseNumber: string
  country: string
  houseNumberSuffix: string
}>()

const formData = toRefs(props)

const fetchAdress = async () => {
  if (v$.value.postcode.$invalid || v$.value.houseNumber.$invalid) {
    return
  }
  await execute()
}

const { required, numeric } = useValidators()

const rules = {
  houseNumber: { required, numeric },
  postcode: { required },
  city: { required },
  street: { required },
}
const v$ = useVuelidate(rules, props)

const { execute, error } = useFetch('/api/address', {
  params: {
    postcode: formData.postcode,
    houseNumber: formData.houseNumber,
    houseNumberSuffix: formData.houseNumberSuffix,
  },
  immediate: false,
  watch: false,
  onResponse: ({ response }) => {
    emits('update:city', response._data.city)
    emits('update:street', response._data.street)
  },
})

const countries: Option[] = [
  { value: CountriesEnum.Be, title: 'België' },
  { value: CountriesEnum.Dk, title: 'Denemarken' },
  { value: CountriesEnum.Fr, title: 'Frankrijk' },
  { value: CountriesEnum.Nl, title: 'Nederland' },
  { value: CountriesEnum.At, title: 'Oostenrijk' },
]

const streetFieldsAreReadonly = computed(() => {
  if (props.country === CountriesEnum.Nl && !error.value) {
    return 'readonly'
  }
  return undefined
})
</script>

<template>
  <form-fieldset title="Adresgegevens" class="fields">
    <div class="country">
      <select-field
        :id="`${id}-country`"
        :model-value="country"
        :options="countries"
        title="Land"
        class="country"
        name="country"
        autocomplete="country"
        @input="$emit('update:country', $event.target.value)"
      />
    </div>
    <template v-if="country === CountriesEnum.Nl">
      <div class="postcode">
        <input-text-field
          :id="`${id}-postcode`"
          :model-value="postcode"
          title="Postcode"
          class="postcode"
          name="postcode"
          :errors="v$.postcode.$errors"
          autocomplete="postcode"
          @input="$emit('update:postcode', $event.target.value)"
          @blur="fetchAdress"
        />
      </div>
      <input-text-field
        :id="`${id}-house-number`"
        :model-value="houseNumber"
        title="Huisnummer"
        name="house-number"
        :errors="v$.houseNumber.$errors"
        autocomplete="house-number"
        @input="$emit('update:house-number', $event.target.value)"
        @blur="fetchAdress"
      />
      <input-text-field
        :id="`${id}-house-number-suffix`"
        :model-value="houseNumberSuffix"
        title="Toevoeging"
        class="house-number-suffix"
        name="house-number-suffix"
        @input="$emit('update:house-number-suffix', $event.target.value)"
        @blur="fetchAdress"
      />
    </template>
    <div class="city">
      <input-text-field
        :id="`${id}-city`"
        :model-value="city"
        title="Plaats"
        class="city"
        name="city"
        :errors="v$.city.$errors"
        autocomplete="city"
        :readonly="streetFieldsAreReadonly"
        @input="$emit('update:city', $event.target.value)"
      />
    </div>
    <div class="street">
      <input-text-field
        :id="`${id}-street`"
        :model-value="street"
        title="Straat"
        class="street"
        name="street"
        autocomplete="street"
        :readonly="streetFieldsAreReadonly"
        @input="$emit('update:street', $event.target.value)"
      />
    </div>

    <form-error-message
      v-if="error?.statusMessage"
      class="error-message"
      :error="$t(error.statusMessage)"
    />
  </form-fieldset>
</template>

<style lang="postcss" scoped>
.fields {
  & :deep(.fields) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.postcode,
.street,
.city {
  grid-column: span 2;
}

.country,
.error-message {
  grid-column: span 4;
}
</style>
