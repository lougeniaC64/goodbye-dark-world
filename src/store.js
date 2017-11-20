// @flow

import axios from 'axios'
import { type Result, Ok, Err } from 'minimal-result'
import { MEETUP_API_KEY, MEETUP_URL_NAME, START_DATE } from './lib/constants'

const baseUrl = `https://api.meetup.com/`
type Error = {|
  httpCode: ?number,
  request: ?mixed,
  response: ?mixed,
  description: ?string
|}
type Meetup = Array<{time: Date, id: number}>
type AttendanceStatus =
  'legacy' | 'maybe' | 'waitlist' | 'yes' | 'absent' | 'all' | 'attended' | 'noshow' | 'excused' | 'relevant' | 'no'
type MeetupStatus =
  'cancelled' | 'draft' | 'past' | 'proposed' | 'suggested' | 'upcoming'

export const getNoShows = () => {
  // getPastMeetupIds()
  // .then(pastMeetups => {
  //   const meetups = pastMeetups.filter(meetup => new Date(meetup.time) > START_DATE)
  // })
  const d = getMeetups('past')
  // .then(meetups => console.log('meetups', meetups))
}

// const getAttendance = (eventId: number, status: AttendanceStatus): Promise<Result<mixed,Error>> => {
//   axios.get(`${baseUrl}/${MEETUP_URL_NAME}/events/${eventId}/attendance?key=${MEETUP_API_KEY}&filter=${status}`)
//     .then(({ meetups }) => )
//     .catch()
// }

const getMeetups = (status: MeetupStatus): Result<Meetup,Error> =>
  axios.get(`${baseUrl}/${MEETUP_URL_NAME}/events?key=${MEETUP_API_KEY}&status=${status}`)
    .then(({ data }) => {
      const getDay = (date: string): number => parseInt(date.substr(8, 2))
      const getMonth = (date: string): number => parseInt(date.substr(5, 2))
      const getYear = (date: string): number => parseInt(date.substr(0,4))

      return data && Array.isArray(data) &&
        data.every(meetup =>
          meetup && typeof meetup === 'object' && meetup.hasProperty('id') && meetup.hasProperty('local_date') &&
          typeof meetup.id === 'number' && typeof meetup.local_date === 'string' && !isNaN(getYear(meetup.local_date)) &&
          !isNaN(getMonth(meetup.local_date)) && !isNaN(getDay(meetup.local_date)))
        ? Ok(
          data.map(meetup => ({ id: data.id, time: meetup.local_date }))
        )
        : Err({ description: 'yikesies' })
    })
    .catch(err =>
      Err({
        httpCode: parseInt(err.response.status),
        request: err.request,
        response: err.response
      })
    )
