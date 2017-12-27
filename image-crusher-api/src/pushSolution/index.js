import { formatImage, parseImage } from '../util/dataStore/parse'
import { withDB } from '../middleware/withDB'
import { ADNtoRImage } from 'common/adn/ADNtoRImage'
import { getFitness } from 'common/rImage/getFitness'
import { getNodeById } from 'common/ancestorTree/read'
import { getBestFitness } from 'common/ancestorTree/stats'

const getNodeScore = tree => tree.fitness

const prune = (ancestorTree, max_children) => {
    const c = ancestorTree.children
        .map(t => ({ f: getBestFitness(t), t }))
        .sort((a, b) => (a.f < b.f ? 1 : -1))
        .slice(0, max_children)

    return {
        ...ancestorTree,
        children: c.map(x => prune(x.t)),
    }
}

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
        ancestorTree: prune(image.ancestorTree, 5),
    }

    await db.update({
        key,
        excludeFromIndexes: ['target', 'PARAM', 'ancestorTree'],
        data: formatImage(newImage),
    })
}

export const run = withDB(handler)
