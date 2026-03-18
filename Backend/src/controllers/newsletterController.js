import * as db from '../db/index.js'
import { success } from '../utils/response.js'

export async function subscribe(req, res, next) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase()
    await db.createNewsletterSubscriber(email)
    return success(res, { message: 'Subscribed successfully' }, 201)
  } catch (e) {
    next(e)
  }
}

