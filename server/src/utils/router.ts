import dotenv from 'dotenv'
import { Request, Response, Router, NextFunction } from 'express'
import { UserService } from '../services/UserService'

dotenv.config()
const { CLIENT_URL } = process.env

const router = Router()
const userService = new UserService()

router.get('/', (_req: Request, res: Response) => res.send('<a href="/gql">GraphQL API</a>'))

router.get('/activate/:nickname/:code', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nickname, code } = req.params
    await userService.activate(nickname, code)
    return res.redirect(CLIENT_URL as string)
  } catch (e) {
    next(e)
  }
})

export default router
