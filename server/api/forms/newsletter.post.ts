
const geti18nErrorKey = (key: string) => {
    switch (key) {
        case 'INVALID_PARAMETERS':
            return 'invalidParameters'
        default:
            return 'formError'
    }
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { newsletter } = useRuntimeConfig()
    const listId = body.products ? newsletter.list.products : newsletter.list.website
    await $fetch(`https://emailoctopus.com/api/1.5/lists/${listId}/contacts`, {
        method: 'POST',
        body: {
            'api_key': newsletter.api_key,
            'email_address': body.email,
            'status': 'SUBSCRIBED',
            'fields': {
                'FirstName': body.firstName,
                'LastName': body.lastName
            }
        }
    }).catch(err => {
        const errorCode = err.data.error.code
        if (errorCode === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
            return 1
        }
        throw createError({
            statusCode: 400,
            statusMessage: geti18nErrorKey(errorCode),
        })
    })

    return 1
})
