import { config } from '../config'
import connectDataStore from '@google-cloud/datastore'
import connectStorage from '@google-cloud/storage'

import { parseImage } from '../util/dataStore/parse'

export const run = async () => {
    const c = {
        projectId: config.googleCloudPlatform.project_id,
        credentials: config.googleCloudPlatform,
    }

    const datastore = connectDataStore(c)
    const storage = connectStorage(c)

    const query = datastore.createQuery('image')

    const [images, _] = await datastore.runQuery(query)

    const content = JSON.stringify(images.map(parseImage))

    const [bucket, __] = await storage.bucket('platane-imagedot-result').get({
        autoCreate: true,
        regional: true,
        location: 'europe-west1',
        nearline: true,
    })

    // set bucket cors
    await bucket.setMetadata({
        cors: [
            {
                origin: ['*'],
                responseHeader: ['Content-Type'],
                method: ['GET', 'HEAD'],
                maxAgeSeconds: 10,
            },
        ],
    })

    // create the file
    const file = bucket.file('res.json')

    await file.save(content, {
        gzip: true,
        public: true,
    })

    return file.name
}
