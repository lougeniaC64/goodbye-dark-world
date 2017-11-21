//getMeetups

//then

// const getDay = (date: string): number => parseInt(date.substr(8, 2))
// const getMonth = (date: string): number => parseInt(date.substr(5, 2))
// const getYear = (date: string): number => parseInt(date.substr(0,4))
//
// return data && Array.isArray(data) &&
//   data.every(meetup =>
//     meetup && typeof meetup === 'object' && meetup.hasProperty('id') && meetup.hasProperty('local_date') &&
//     typeof meetup.id === 'number' && typeof meetup.local_date === 'string' && !isNaN(getYear(meetup.local_date)) &&
//     !isNaN(getMonth(meetup.local_date)) && !isNaN(getDay(meetup.local_date)))
//   ? Ok(
//     data.map(meetup => ({ id: data.id, time: meetup.local_date }))
//   )
//   : Err({ description: 'yikesies' })

//catch

// Err({
//   httpCode: parseInt(err.response.status),
//   request: err.request,
//   response: err.response
// })
