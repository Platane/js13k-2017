import connectDataStore from '@google-cloud/datastore'
import { config } from '../config'

export const withDB = next => (data, ctx = {}) => {
    ctx.db = connectDataStore({
        namespace: config.ENV,
        projectId: config.googleCloudPlatform.project_id,
        credentials: config.googleCloudPlatform,
    })

    return next(data, ctx)
}
