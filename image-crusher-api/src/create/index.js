import { formatImage } from '../util/dataStore/parse'
import { protect } from '../middleware/protect'
import { withDB } from '../middleware/withDB'

const handler = async (data, { db }) => {
    const { PARAM, target } = data

    const image = {
        PARAM,
        target,
        ancestorTree: {
            id: 'root',
            adn: [],
            fitness: 0,
            children: [],
        },
    }

    const key = db.key(['image'])

    await db.insert({
        key,
        excludeFromIndexes: ['target', 'PARAM', 'ancestorTree'],
        data: formatImage(image),
    })

    return key.id
}

export const run = protect(withDB(handler))
