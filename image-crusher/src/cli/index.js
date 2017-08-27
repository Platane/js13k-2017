import { writeRImage, readAsRImage } from './rImage'

import { drawCircle } from '../util/rImage/draw'
import { diff } from '../util/rImage/diff'
import { colorDistance } from '../util/color'

import { mutate, initAdn } from '../genetic/mutate'
import { getRImage } from '../genetic/ADNtoRImage'
import { packADN } from '../genetic/packADN'
import { step } from '../genetic'

import * as PARAM from '../param'

const startGen = (target, n) => {
    console.log('-- starting')

    const getFitness = adn => diff(colorDistance, target, getRImage(adn))

    let best = initAdn()
    let bestFitness = getFitness(best)

    let generation = 0
    let improvements = 0

    const step = () => {
        generation++

        const mutated = mutate(best)
        const mutated_fitness = getFitness(mutated)

        if (mutated_fitness < bestFitness) {
            bestFitness = mutated_fitness
            best = mutated
        }
    }

    const start = Date.now()

    for (let i = 0; i <= n; i++) {
        if (i % 500 === 0) {
            console.log(
                `generation ${i}, error: ${bestFitness /
                    (255 * 255 * 3 * PARAM.SIZE * PARAM.SIZE)}`
            )

            writeRImage(getRImage(best), `dist-cli/out-${i}.png`)
        }

        step()
    }

    console.log(`-- ended in ${Date.now() - start} ms`)
}

startGen(readAsRImage(process.argv[2]), +process.argv[3])
