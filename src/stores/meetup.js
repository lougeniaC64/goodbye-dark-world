// @flow

import axios from 'axios'
import type { AxiosPromise } from 'axios'
import { type Result, Ok, Err } from 'minimal-result'
import { MEETUP_API_KEY, MEETUP_URL_NAME, START_DATE } from '../lib/constants'

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

const getAttendance = (eventId: number, status: AttendanceStatus): AxiosPromise<mixed> =>
  axios.get(`${baseUrl}/${MEETUP_URL_NAME}/events/${eventId}/attendance?key=${MEETUP_API_KEY}&filter=${status}`)
    .then(({ data }) => data)
    .catch(err => err)

const getMeetups = (status: MeetupStatus): AxiosPromise<Array<Meetup>> =>
  axios.get(`${baseUrl}/${MEETUP_URL_NAME}/events?key=${MEETUP_API_KEY}&status=${status}`)
    .then(({ data }) => data)
    .catch(err => err)
