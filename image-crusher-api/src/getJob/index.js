import { parseImage } from '../util/dataStore/parse'
import { withDB } from '../middleware/withDB'
import { getNextFork } from 'common/genetic/getNextFork'

const countNode = (tree: AncestorTree) =>
    tree.children.reduce((sum, child) => sum + countNode(child), 1)

const pickImage = (images: { ancestorTree: AncestorTree }): * =>
    images
        .map(image => ({
            ...image,
            n: countNode(image.ancestorTree),
        }))
        .sort((a, b) => (a.n > b.n ? 1 : -1))[
        Math.min(images.length - 1, Math.floor(Math.random() * 8))
    ]

export const handler = async (_, { db }) => {
    const images = await db.get(db.key(['image', 5083289484263424]))

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
