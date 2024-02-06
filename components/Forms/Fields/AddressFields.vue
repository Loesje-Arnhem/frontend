<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import type { Option } from '~/types/Option'

const emits = defineEmits([
  'update:country',
  'update:postcode',
  'update:street',
  'update:house-number',
  'update:city',
  'update:house-number-suffix',
  'update:address1',
  'update:address2',
])

const props = defineProps<{
  id: string
  city: string
  postcode: string
  street: string
  houseNumber: string
  country: string
  houseNumberSuffix: string
  address1: string
  address2: string
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

const { data } = await useAsyncData('countries', async () => {
  const response = await $fetch('/api/store/countries')
  const options: Option[] = response.map((item) => {
    return {
      value: item.code,
      title: item.name,
    }
  })
  return options
})

const streetFieldsAreReadonly = computed(() => {
  if (props.country === 'NL' && !error.value) {
    return 'readonly'
  }
  return undefined
})
</script>

<template>
  <form-fieldset title="Adresgegevens" class="fields">
    <div class="country">
      <select-field
        v-if="data"
        :id="`${id}-country`"
        :model-value="country"
        :options="data"
        title="Land"
        class="country"
        name="country"
        autocomplete="country"
        @input="$emit('update:country', $event.target.value)"
      />
    </div>
    <template v-if="country === 'NL'">
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
    <template v-else>
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
        />
      </div>
      <div class="address1">
        <input-text-field
          :id="`${id}-address1`"
          :model-value="address1"
          title="Straat en huisnummer"
          class="address1"
          name="address1"
          autocomplete="address1"
          @input="$emit('update:address1', $event.target.value)"
          @blur="fetchAdress"
        />
      </div>
      <div class="address2">
        <input-text-field
          :id="`${id}-address2`"
          :model-value="address2"
          title="address2"
          class="address2"
          name="address2"
          autocomplete="address2"
          @input="$emit('update:address2', $event.target.value)"
          @blur="fetchAdress"
        />
      </div>
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
@import '~/assets/css/media-queries/media-queries.css';

.fields {
  & :deep(.fields) {
    grid-template-columns: repeat(2, 1fr);
    @media (--viewport-sm) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.address1,
.address2,
.postcode,
.street,
.city {
  grid-column: span 2;
}

.country,
.error-message {
  grid-column: span 2;
  @media (--viewport-sm) {
    grid-column: span 4;
  }
}
</style>
