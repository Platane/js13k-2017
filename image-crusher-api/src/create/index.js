import { config } from '../config'
import connectDataStore from '@google-cloud/datastore'
import { formatImage } from '../util/dataStore/parse'

export const run = async data => {
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
