import * as PARAM from '../param'

import type { ADN } from './type'

export const step = (
    mutate: (adn: ADN) => ADN,
    getFitness: (adn: ADN) => number,
    current_adn: ADN,
    current_fitness: number
): ADN => {
    let bestAdn = current_adn
    let bestFitness = current_fitness || getFitness(current_adn)

    for (let i = PARAM.MUTATED_BY_STEP; i--; ) {
        const mutated = mutate(current_adn)

        const fitness = getFitness(mutated)

        if (fitness < bestFitness) {
            bestAdn = mutated
            bestFitness = fitness
        }
    }

    return bestAdn
}
