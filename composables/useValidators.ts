import {
  email as emailDefault,
  required as requiredDefault,
  minLength as minLengthDefault,
  maxLength as maxLengthDefault,
  minValue as minValueDefault,
  maxValue as maxValueDefault,
  numeric as numericDefault,
  createI18nMessage,
} from '@vuelidate/validators'

export const useValidators = () => {
  // Create your i18n message instance. Used for vue-i18n@9
  const i18n = useI18n()

  const withI18nMessage = createI18nMessage({ t: i18n.t.bind(i18n) })

  // wrap each validator.
  // https://github.com/vuelidate/vuelidate/blob/next/packages/validators/src/withMessages/numeric.js
  const required = withI18nMessage(requiredDefault)
  const email = withI18nMessage(emailDefault)
  const numeric = withI18nMessage(numericDefault)

  // validators that expect a parameter should have `{ withArguments: true }` passed as a second parameter, to annotate they should be wrapped
  const minLength = withI18nMessage(minLengthDefault, {
    withArguments: true,
  })
  const maxLength = withI18nMessage(maxLengthDefault, {
    withArguments: true,
  })
  const minValue = withI18nMessage(minValueDefault, {
    withArguments: true,
  })
  const maxValue = withI18nMessage(maxValueDefault, {
    withArguments: true,
  })

  return {
    email,
    required,
    maxLength,
    minLength,
    numeric,
    minValue,
    maxValue,
  }
}
