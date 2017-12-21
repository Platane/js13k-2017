import { config } from '../config'
import connectDataStore from '@google-cloud/datastore'
import { parseImage } from '../util/dataStore/parse'

export const run = async () => {
    const datastore = connectDataStore({
        projectId: config.googleCloudPlatform.project_id,
        credentials: config.googleCloudPlatform,
    })

    const query = datastore.createQuery('image')

    const [images, _] = await datastore.runQuery(query)

    return images.map(x => ({ ...parseImage(x), id: x[datastore.KEY].id }))
}
