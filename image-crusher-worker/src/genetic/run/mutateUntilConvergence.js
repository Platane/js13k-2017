import { getLimit } from '../../config/param'
import type { ADN, AncestorTree } from '../../type'

export const mutateUntilConvergence = async (
    mutateHard: (adn: ADN) => ADN,
    mutateSoft: (adn: ADN) => ADN,
    getFitness: (adn: ADN) => number,
    best: { adn: ADN, fitness: number }
) => {
    let unchanged_since = 0

    const limit = getLimit(best.adn.length)
    let mutate = mutateHard
    let k = 0

    while (k < limit.length) {
        const adn = mutate(best.adn)

        const fitness = getFitness(adn)

        if (fitness < best.fitness) {
            best.fitness = fitness
            best.adn = adn

            unchanged_since = 0
        } else unchanged_since++

        if (unchanged_since > limit[k]) {
            k++
            unchanged_since = 0
            mutate = mutateSoft
        }
    }
}
