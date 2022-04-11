// @/utils/i18n-validators.js
import * as validators from '@vuelidate/validators'
import { useContext } from '@nuxtjs/composition-api'
import { createI18nMessage } from '@vuelidate/validators'

export default () => {
  // Create your i18n message instance. Used for vue-i18n@9
  const { i18n } = useContext()
  const withI18nMessage = createI18nMessage({ t: i18n.t.bind(i18n) })

  // for vue-i18n@8
  // const withI18nMessage = createI18nMessage({ t: i18n.t.bind(i18n) })

  // wrap each validator.
  const required = withI18nMessage(validators.required)
  console.log({
    required: validators.required,
  })

  // validators that expect a parameter should have `{ withArguments: true }` passed as a second parameter, to annotate they should be wrapped
  const minLength = withI18nMessage(validators.minLength, {
    withArguments: true,
  })
  // or you can provide the param at definition, statically
  const maxLength = withI18nMessage(validators.maxLength(10))
  return {
    required,
    maxLength,
    minLength,
  }
}
