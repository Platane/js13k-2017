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
    let best = initAdn()

    const fitness = adn => diff(colorDistance, target, getRImage(adn))

    console.log('-- starting')

    const start = Date.now()

    for (let i = 0; i <= n; i++) {
        if (i % 100 === 0) {
            console.log(
                `generation ${i}, error: ${fitness(best) /
                    (255 * 255 * 3 * PARAM.SIZE * PARAM.SIZE)}`
            )

            writeRImage(getRImage(best), `dist-cli/out-${i}.png`)
        }

        best = step(mutate, fitness, best)
    }

    console.log(`-- ended in ${Date.now() - start} ms`)
}

startGen(readAsRImage(process.argv[2]), +process.argv[3])
