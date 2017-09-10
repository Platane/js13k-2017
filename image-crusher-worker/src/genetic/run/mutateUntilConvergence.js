import { asPromise as wait } from '../../util/raf'
import type { ADN, AncestorTree, Param } from '../../type'

export const mutateUntilConvergence = async (
    PARAM: Param,
    mutate: (adn: ADN) => ADN,
    getFitness: (adn: ADN) => number,
    best: { adn: ADN, fitness: number }
) => {
    let unchanged_since = 0

    while (
        unchanged_since <
        best.adn.length * PARAM.CONVERGED_WHEN_UNCHANGED_SINCE
    ) {
        for (let n = PARAM.N_BATCH; n--; ) {
            const adn = mutate(best.adn)

            const fitness = getFitness(adn)

            if (fitness < best.fitness) {
                best.fitness = fitness
                best.adn = adn

                unchanged_since = 0
            } else unchanged_since++
        }

        await wait()
    }
}
