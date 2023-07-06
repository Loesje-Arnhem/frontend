import useVuelidate, { ValidationArgs } from "@vuelidate/core";
import { Endpoints } from "~/enums/endpoints";

export default (rules: object, formData: ValidationArgs, endpoint: Endpoints.FormNewsletter | Endpoints.FormWorkshop) => {
    const loading = ref(false)
    const submitted = ref(false)
    const error = ref('')
    const v$ = useVuelidate(rules, formData)

    const submit = async () => {
        error.value = ''

        const isFormCorrect = await v$.value.$validate()
        if (!isFormCorrect) {
            return
        }

        loading.value = true

        try {
            const response = await $fetch(endpoint, {
                method: 'POST',
                body: formData
            }).catch(err => {
                error.value = err.data.message
            })
            if (response === 1) {
                submitted.value = true
            }
        } finally {
            loading.value = false
        }
    }
    return {
        submit,
        v$,
        error,
        submitted,
        loading,
    }

}