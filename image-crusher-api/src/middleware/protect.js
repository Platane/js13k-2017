import crypto from 'crypto'
import { config } from '../config'

export const protect = next => (data, ctx = {}) => {
    const token = (
        ctx.req.headers['Authorization'] ||
        ctx.req.headers['authorization'] ||
        ''
    ).replace('Bearer ', '')

    const hash = crypto
        .createHash('sha256')
        .update(token)
        .digest('base64')

    console.log('token:', token, 'hash:', hash)

    if (hash !== config.secret) throw new Error('unauthorized')

    return next(data, ctx)
}
