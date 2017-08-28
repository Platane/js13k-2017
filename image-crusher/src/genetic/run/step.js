import * as PARAM from '../../param'
import { asPromise as wait } from '../../util/raf'
import type { ADN, AncestorTree } from '../../type'

export const stepUntilConvergence = async (
    mutate: (adn: ADN) => ADN,
    getFitness: (adn: ADN) => number,
    best: { adn: ADN, fitness: number },
    log: () => void
) => {
    let unchanged_since = 0

    while (unchanged_since < PARAM.CONVERGED_WHEN_UNCHANGED_SINCE) {
        for (let n = PARAM.N_BATCH; n--; ) {
            const adn = mutate(best.adn)

            const fitness = getFitness(adn)

            if (fitness < best.fitness) {
                best.fitness = fitness
                best.adn = adn

                unchanged_since = 0
            } else unchanged_since++
        }

        log && log()

        await wait()
    }
}
