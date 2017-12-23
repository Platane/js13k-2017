import { parseImage } from '../util/dataStore/parse'
import { withDB } from '../middleware/withDB'

export const handler = async (_, { db }) => {
    const query = db.createQuery('image')

    const [images, __] = await db.runQuery(query)

    return images.map(x => ({ ...parseImage(x), id: x[db.KEY].id }))
}

export const run = withDB(handler)
