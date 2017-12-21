import { config } from './config'
import connectDataStore from '@google-cloud/datastore'

import { drawCircle } from './util/rImage/draw'
import { diff } from './util/rImage/diff'
import { colorDistance } from './util/color'

import { mutateHard, mutateSoft, initAdn, addGene } from './genetic/mutate'
import { getRImage } from './genetic/ADNtoRImage'
import { step } from './genetic/run/step'
import { mergeAncestorTree } from './util/ancestorTree/merge'
import { parseImage, formatImage } from './util/dataStore/parse'

import type { RImage, AncestorTree, Param } from './type'

const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)]

const countNode = (tree: AncestorTree) =>
    tree.children.reduce((sum, child) => sum + countNode(child), 1)

export const run = async () => {
    // connect to the datastore
    const datastore = connectDataStore({
        projectId: config.googleCloudPlatform.project_id,
        credentials: config.googleCloudPlatform,
    })

    // pick an image to work with
    const query = datastore.createQuery('image')
    const [images, _] = await datastore.runQuery(query)

    // pick the one with the less node
    const u = Math.min(images.length - 1, Math.floor(Math.random() * 8))
    const { target, PARAM, ancestorTree, key, n } = images
        .map(image => {
            const x = parseImage(image)

            return {
                ...x,
                n: countNode(x.ancestorTree),
                key: image[datastore.KEY],
            }
        })
        .sort((a, b) => (a.n > b.n ? 1 : -1))[u]

    console.log('pick the image', key.path)

    console.log('start to compute ...')

    const newAncestorTree = await step(
        adn => mutateHard(PARAM, adn),
        adn => mutateSoft(PARAM, adn),
        adn => diff(colorDistance, target, getRImage(PARAM, adn)),
        adn => addGene(PARAM, adn),
        ancestorTree
    )

    console.log('end compute')

    {
        // reload a fresh version on the image
        const [newImage] = await datastore.get(key)

        // save
        await datastore.save({
            method: 'update',
            key: key,
            excludeFromIndexes: ['target', 'PARAM', 'ancestorTree'],
            data: formatImage({
                target,
                PARAM,
                ancestorTree: mergeAncestorTree(
                    newAncestorTree,
                    parseImage(newImage).ancestorTree
                ),
            }),
        })
    }
}
