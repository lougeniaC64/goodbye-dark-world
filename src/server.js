// @flow

import express from 'express'

const app = express()
const port: number = 3000

app.get('/', (req, res) => res.send('Laters'))

app.listen(port, () => console.log(`Goodbye Dark World listening on port ${port}!`))
