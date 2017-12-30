import { mutateHard } from 'common/genetic/mutation/hardMutation'
import { mutateSoft } from 'common/genetic/mutation/softMutation'
import { addGene } from 'common/genetic/mutation/addGene'
import * as rTree from 'common/fastRImage/rImageTree'
import { getFitness } from 'common/fastRImage/rImage/diff'
import { getLimit } from 'common/genetic/config'
import fetch from 'node-fetch'
import type { RImage, AncestorTree, Param } from 'type'

const endPoint = 'https://us-central1-imagedot-179509.cloudfunctions.net'

export const mutateUntilConvergence = (param, target, initAdn) => {
    let unchanged_since = 0

    const limit = getLimit(initAdn)
    let mutate = mutateHard
    let k = 0

    let adn = initAdn

    let rt = rTree.create(param, adn)
    let fitness = getFitness(target, rt.rImage)

    while (k < limit.length) {
        const adn_ = mutate(param, adn)

        const rt_ = rTree.mutate(param, adn, adn_, rt)

        const fitness_ = getFitness(target, rt_.rImage)

        if (fitness_ > fitness) {
            fitness = fitness_
            adn = adn_
            rt = rt_

            unchanged_since = 0
        } else unchanged_since++

        if (unchanged_since > limit[k]) {
            k++
            unchanged_since = 0
            mutate = mutateSoft
        }
    }

    return adn
}

export const run = async ({ onStart, onEnd } = {}) => {
    const x = await (await fetch(endPoint + '/getJob')).json()

    const { imageId, PARAM, target, parent } = x

    if (onStart) onStart(x)

    const adn = mutateUntilConvergence(
        PARAM,
        target,
        addGene(PARAM, parent.adn)
    )

    if (onEnd) onEnd({ ...x, adn })

    await fetch(endPoint + '/pushSolution', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            adn,
            imageId,
            parentId: parent.id,
        }),
    })
}
