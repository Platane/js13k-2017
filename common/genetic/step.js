import { mutateUntilConvergence } from './mutateUntilConvergence'
import { getNextFork } from './getNextFork'
import type { ADN, AncestorTree } from 'type'

export const step = async (
    mutateHard: (adn: ADN) => ADN,
    mutateSoft: (adn: ADN) => ADN,
    getFitness: (adn: ADN) => number,
    addGene: (adn: ADN) => ADN | null,
    ancestorTree: AncestorTree
): Promise<AncestorTree> => {
    const parent = getNextFork(ancestorTree)

    const adn = addGene(nextFork.adn)

    // return ancestorTree
    const node = { adn, fitness: getFitness(adn), children: [] }

    parent.children.push(node)

    await mutateUntilConvergence(mutateHard, mutateSoft, getFitness, node)

    return ancestorTree
}
