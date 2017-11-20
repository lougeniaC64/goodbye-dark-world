// @flow
import { Router } from 'express'
import { getNoShows } from './store'

const router = new Router()

router.get('/', (req, res) => {
  getNoShows()
  res.send('Laters2')
})

export default router
