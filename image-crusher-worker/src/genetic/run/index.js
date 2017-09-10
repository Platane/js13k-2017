import { step } from './step'
import { getBestFit } from './getBestFit'

import type { Param, ADN, AncestorTree } from '../../type'

/**
 * shotgun hill climbing approach, with incremental gene
 *
 * - start with a random sequence of X gene
 * - iterate until the "best fit" is found
 * - add Y gene
 * - ...
 *
 *
 */

export const run = async (
    PARAM: Param,
    mutate: (adn: ADN) => ADN,
    getFitness: (adn: ADN) => number,
    addGene: (adn: ADN) => ADN | null
) => {
    let ancestorTree: AncestorTree = {
        adn: [],
        fitness: Infinity,
        children: [],
    }

    for (let k = PARAM.N_FORK; k--; )
        ancestorTree = await step(
            PARAM,
            mutate,
            getFitness,
            addGene,
            ancestorTree
        )

    return getBestFit(ancestorTree)
}
