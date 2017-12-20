import { config } from '../config'
import connectDataStore from '@google-cloud/datastore'
import { formatImage } from '../util/dataStore/parse'
const crypto = require('crypto')

const protect = next => (data, req) => {
    const token = (
        req.headers['Authorization'] ||
        req.headers['authorization'] ||
        ''
    ).replace('Bearer ', '')

    console.log(token)

    const hash = crypto
        .createHash('sha256')
        .update(token)
        .digest('base64')

    console.log(token, hash, config.secret)
    console.log(data)

    if (hash !== config.secret) throw new Error('unauthorized')

    return next(data, req)
}

const handler = async (data, req) => {
    const datastore = connectDataStore({
        projectId: config.googleCloudPlatform.project_id,
        credentials: config.googleCloudPlatform,
    })

    await datastore.save({
        key: datastore.key(['image']),
        method: 'insert',
        excludeFromIndexes: ['target', 'PARAM', 'ancestorTree'],
        data: { ...formatImage(data), insert_date: Date.now() },
    })
}

export const run = protect(handler)
