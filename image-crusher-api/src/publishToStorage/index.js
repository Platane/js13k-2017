import { config } from '../config'
import connectStorage from '@google-cloud/storage'

import { run as get } from '../get'

export const run = async () => {
    const storage = connectStorage({
        projectId: config.googleCloudPlatform.project_id,
        credentials: config.googleCloudPlatform,
    })

    // prepare bucket
    const [bucket, __] = await storage.bucket('platane-imagedot-result').get({
        autoCreate: true,
        regional: true,
        location: 'europe-west1',
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
    const content = JSON.stringify(await get())

    await file.save(content, {
        gzip: true,
        public: true,
    })

    return file.name
}
