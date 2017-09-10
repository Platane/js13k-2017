import { config } from '../config'
import connectDataStore from '@google-cloud/datastore'

export const run = async () => {
    const datastore = connectDataStore({
        projectId: config.googleCloudPlatform.project_id,
        credentials: config.googleCloudPlatform,
    })

    const query = datastore.createQuery('image')

    const [images, _] = await datastore.runQuery(query)

    return images.map(x => ({
        target: x.target,
        PARAM: x.PARAM,
        ancestorTree: x.ancestorTree,
    }))
}
