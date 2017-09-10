import { mutateUntilConvergence } from './mutateUntilConvergence'
import { getNextFork } from './getNextFork'

import type { Param, ADN, AncestorTree } from '../../type'

export const step = async (
    PARAM: Param,
    mutate: (adn: ADN) => ADN,
    getFitness: (adn: ADN) => number,
    addGene: (adn: ADN) => ADN | null,
    ancestorTree: AncestorTree
): Promise<AncestorTree> => {
    let adn, nextFork
    let k = 100

    while (!adn || !nextFork) {
        nextFork = getNextFork(PARAM, ancestorTree)

        adn = addGene(nextFork.adn)

        if (k-- < 0) throw new Error('can not find suitable fork')
    }

    // return ancestorTree
    const node = { adn, fitness: getFitness(adn), children: [] }

    nextFork.children.push(node)

    await mutateUntilConvergence(PARAM, mutate, getFitness, node)

    return ancestorTree
}
