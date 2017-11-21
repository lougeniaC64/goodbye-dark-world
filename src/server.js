// @flow

import express from 'express'
import noShows from './routers/noShows'

export const app = express()
const port: number = 5000

// app.use('noShows', noShows)
app.use(noShows)
app.listen(port, () => console.log(`Goodbye Dark World listening on port ${port}!`))
