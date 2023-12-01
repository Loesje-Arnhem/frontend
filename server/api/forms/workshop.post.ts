export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const times = body.time.split(':')
  let startTime = ''
  let endTime = ''
  if (times.length === 2) {
    startTime = times[0]
    endTime = times[1]
  }
  let formattedDate = ''
  const date = new Date(body.date)
  if (date instanceof Date && !isNaN(date.valueOf())) {
    console.log('----')
    formattedDate = new Intl.DateTimeFormat('nl-NL', {
      dateStyle: 'full',
    }).format(date)
  }
  await $fetch('https://derobotvan.loesje.nl/workshopaanvragen.php', {
    method: 'POST',
    body: {
      naam: body.name,
      org: body.companyName,
      address: body.address,
      cpostcode: body.zipcode,
      ctown: body.city,
      tel: body.phoneNumber,
      email: body.email,
      motivatie: body.motivation,
      wsdate: formattedDate,
      wsstarttimeh: startTime,
      wsstarttimem: endTime,
      countparticipants: body.totalAttendees,
      wslocation: body.location,
      countworkshops: body.totalWorkshops,
      schrijfthema: body.theme,
      akkoord: 'jsononly',
    },
  }).catch((err) => {
    throw createError({
      statusCode: 400,
      statusMessage: err.data,
    })
  })
  return 1
})