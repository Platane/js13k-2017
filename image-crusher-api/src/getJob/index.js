import { parseImage } from '../util/dataStore/parse'
import { withDB } from '../middleware/withDB'
import { getNextFork } from 'common/genetic/getNextFork'

const countNode = (tree: AncestorTree) =>
    tree.children.reduce((sum, child) => sum + countNode(child), 1)

// pick the next image
// get one of the 8 images that have the least nodes
const pickImage = (images: { ancestorTree: AncestorTree }[]): * =>
    // sort all images by node count ascending
    images
        .map(image => ({
            ...image,
            n: countNode(image.ancestorTree),
        }))
        .sort((a, b) => (a.n > b.n ? 1 : -1))[
        // take one of the first 8 images
        Math.min(images.length - 1, Math.floor(Math.random() * 8))
    ]

export const handler = async (_, { db }) => {
    const query = db.createQuery('image')

    const [images, __] = await db.runQuery(query)

    const image = pickImage(
        images.map(x => ({ ...parseImage(x), id: x[db.KEY].id }))
    )

    const parent = getNextFork(image.ancestorTree)

    return {
        imageId: image.id,
        parent: {
            id: parent.id,
            adn: parent.adn,
            fitness: parent.fitness,
        },
        PARAM: image.PARAM,
        target: image.target,
    }
}

export const run = withDB(handler)
