import * as PARAM from '../../param'
import { stepUntilConvergence } from './step'
import EventEmitter from 'events'

import type { ADN, AncestorTree } from '../../type'

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

const getLeaves = (tree: AncestorTree) =>
    tree.children.length === 0
        ? [tree]
        : [].concat(...tree.children.map(getLeaves))

const getBestFit = (tree: AncestorTree): ADN =>
    getLeaves(tree).reduce(
        (best, x) => (!best || best.fitness > x.fitness ? x : best),
        null
    ).adn

const getNextFork = (tree: AncestorTree): AncestorTree => {
    const path = []

    let end = tree
    while (end.children[0]) {
        end = end.children[0]
        path.push(0)
    }

    let u = tree
    while (u) {
        if (Math.random() > 0.5) return u

        u = u.children[Math.floor(Math.random() * u.children.length)]
    }

    return end
}

export const run = async (
    mutate: (adn: ADN) => ADN,
    getFitness: (adn: ADN) => number,
    addGene: (adn: ADN) => ADN | null,
    log: (ancestorTree: AncestorTree) => void
) => {
    const ancestorTree: AncestorTree = {
        adn: [],
        fitness: Infinity,
        children: [],
    }

    const _log = () => log(ancestorTree)

    for (let k = PARAM.N_FORK; k--; ) {
        const nextFork = getNextFork(ancestorTree)

        const adn = addGene(nextFork.adn)

        if (!adn) continue

        const node = { adn, fitness: getFitness(adn), children: [] }

        nextFork.children.push(node)

        _log()

        await stepUntilConvergence(mutate, getFitness, node, _log)
    }

    return getBestFit(ancestorTree)
}
