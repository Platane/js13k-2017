import { formatImage, parseImage } from '../util/dataStore/parse'
import { withDB } from '../middleware/withDB'
import { ADNtoRImage } from 'common/adn/ADNtoRImage'
import { getFitness } from 'common/rImage/getFitness'
import { getNodeById } from 'common/ancestorTree/read'

const getNodeScore = tree => tree.fitness

const prune2 = (ancestorTree, max_children) => ({
    ...ancestorTree,

    children: ancestorTree.children
        .slice()
        .sort((a, b) => (a.fitness < b.fitness ? 1 : -1))
        .slice(0, max_children)
        .map(x => prune(x, max_children)),
})
const prune = x => x

const genId = () =>
    Math.random()
        .toString(16)
        .slice(2)

const handler = async (data, { db }) => {
    const { imageId, parentId, adn } = data

    const key = db.key(['image', +imageId])

    const image = parseImage((await db.get(key))[0])

    const parentNode = image && getNodeById(image.ancestorTree, parentId)

    if (!parentNode) throw new Error('parent not fount')

    const fitness = getFitness(
        image.PARAM.SIZE,
        image.target,
        ADNtoRImage(image.PARAM, adn)
    )

    if (fitness <= parentNode.fitness)
        throw new Error('adn is not good enougth')

    parentNode.children.push({
        children: [],
        fitness,
        adn,
        id: genId(),
    })

    const newImage = {
        ...image,
        ancestorTree: prune(image.ancestorTree),
    }

    await db.update({
        key,
        excludeFromIndexes: ['target', 'PARAM', 'ancestorTree'],
        data: formatImage(newImage),
    })
}

export const run = withDB(handler)
