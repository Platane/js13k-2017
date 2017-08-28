import { writeRImage, readAsRImage } from './rImage'

import { drawCircle } from '../util/rImage/draw'
import { diff } from '../util/rImage/diff'
import { colorDistance } from '../util/color'

import { mutate, initAdn } from '../genetic/mutate'
import { getRImage } from '../genetic/ADNtoRImage'
import { packADN } from '../genetic/pack'
import { step } from '../genetic'

const fs = require('fs')

import * as PARAM from '../param'

const N_BATCH = 1000

const startGen = (target, n) => {
    console.log('-- starting')

    const getFitness = adn => diff(colorDistance, target, getRImage(adn))

    let lastWrited = null
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
        if (i % N_BATCH === 0) {
            console.log(
                `generation ${i}, error: ${bestFitness /
                    (255 * 255 * 3 * PARAM.SIZE * PARAM.SIZE)}`
            )

            if (lastWrited != best) {
                writeRImage(
                    getRImage((lastWrited = best)),
                    `dist-cli/out-${i / N_BATCH}.png`
                )
                fs.writeFileSync(
                    `dist-cli/out-${i / N_BATCH}.adn`,
                    packADN(best).toString()
                    // Buffer.from(packADN(best)).toString()
                    // { encoding: 'ascii' }
                )
            }
        }

        step()
    }

    console.log(`-- ended in ${Date.now() - start} ms`)
}

startGen(readAsRImage(process.argv[2]), +process.argv[3])
