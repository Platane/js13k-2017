import { config } from './config'
import connectDataStore from '@google-cloud/datastore'

import { drawCircle } from './util/rImage/draw'
import { diff } from './util/rImage/diff'
import { colorDistance } from './util/color'

import { mutate, initAdn, addGene } from './genetic/mutate'
import { getRImage } from './genetic/ADNtoRImage'
import { step } from './genetic/run/step'
import { mergeAncestorTree } from './util/ancestorTree/merge'
import { parseImage, formatImage } from './util/dataStore/parse'

import type { RImage, AncestorTree, Param } from './type'

const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)]

export const run = async (options: ?{ PARAM?: Object }) => {
    // connect to the datastore
    const datastore = connectDataStore({
        projectId: config.googleCloudPlatform.project_id,
        credentials: config.googleCloudPlatform,
    })

    // pick an image to work with
    const query = datastore.createQuery('image')
    const [images, _] = await datastore.runQuery(query)
    const image = pickRandom(images)

    const key = image[datastore.KEY]

    console.log('pick the image', key.path)

    // step
    const { target, PARAM, ancestorTree } = parseImage(image)

    // override PARAM
    // ( for testing purpose )
    if (options && options.PARAM)
        Object.keys(options.PARAM).forEach(
            key => (PARAM[key] = options.PARAM[key])
        )

    console.log('start to compute ...')

    const newAncestorTree = await step(
        PARAM,
        adn => mutate(PARAM, adn),
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
