import { ADNtoRImage } from 'common/adn/ADNtoRImage'
import { getFitness } from 'common/rImage/getFitness'
import { mutateHard } from 'common/genetic/mutation/hardMutation'
import { mutateSoft } from 'common/genetic/mutation/softMutation'
import { addGene } from 'common/genetic/mutation/addGene'
import { mutateUntilConvergence } from 'common/genetic/mutateUntilConvergence'
import fetch from 'node-fetch'
import type { RImage, AncestorTree, Param } from 'type'

const endPoint = 'https://us-central1-imagedot-179509.cloudfunctions.net'

export const run = async () => {
    const x = await (await fetch(endPoint + '/getJob')).json()

    const { imageId, PARAM, target, parent } = x

    console.log(`select image ${imageId}, start computing`)

    const getFitness_ = adn =>
        getFitness(PARAM.SIZE, target, ADNtoRImage(PARAM, adn))
    const mutateHard_ = adn => mutateHard(PARAM, adn)
    const mutateSoft_ = adn => mutateSoft(PARAM, adn)

    const newInitialAdn = addGene(PARAM, parent.adn)

    const newNode = {
        adn: newInitialAdn,
        fitness: getFitness_(newInitialAdn),
    }

    await mutateUntilConvergence(mutateHard_, mutateSoft_, getFitness_, newNode)

    console.log('end compute', `${parent.fitness} -> ${newNode.fitness}`)

    await fetch(endPoint + '/pushSolution', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            imageId,
            parentId: parent.id,
            adn: newNode.adn,
        }),
    })
}
