import { formatImage, parseImage } from '../util/dataStore/parse'
import { withDB } from '../middleware/withDB'
import * as PARAM from 'common/param'

const handler = async (_, { db }) => {
    const query = db.createQuery('image')

    const [images, __] = await db.runQuery(query)

    console.log(`reseting  ${images.length} images`)

    await db.update(
        images.map(x => {
            const image = parseImage(x)

            const newImage = {
                PARAM,
                target: image.target,
                ancestorTree: { fitness: 0, adn: [], children: [], id: 'root' },
            }

            return {
                key: x[db.KEY],
                excludeFromIndexes: ['target', 'PARAM', 'ancestorTree'],
                data: formatImage(newImage),
            }
        })
    )

    console.log('done')
}

export const run = withDB(handler)
