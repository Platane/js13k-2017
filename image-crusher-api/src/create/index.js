import { config } from '../config'
import connectDataStore from '@google-cloud/datastore'
import { formatImage } from '../util/dataStore/parse'

const protect = next => (data, req) => {
    const token = (
        req.headers['Authorization'] ||
        req.headers['authorization'] ||
        ''
    ).replace('Bearer ', '')

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
        data: formatImage(data),
    })
}

export const run = protect(handler)
