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

const extractNDepth = (tree: AncestorTree, n: number): AncestorTree[] =>
    n == 0
        ? [tree]
        : [].concat(...tree.children.map(x => extractNDepth(x, n - 1)))

const getNextFork = (tree: AncestorTree): AncestorTree => {
    const path = []

    const layers = Array.from(
        { length: Math.ceil(PARAM.N_CIRCLE / PARAM.GENE_BATCH) },
        (_, i) => extractNDepth(tree, i)
    )

    let n = 0
    if (layers[layers.length - 1].length < PARAM.HORIZONTAL_TRIAL) {
        for (n = 0; layers[n + 1].length >= PARAM.HORIZONTAL_TRIAL; n++);
    } else {
        n = Math.floor(Math.random() * layers.length)
    }

    layers[n].sort((a, b) => (a.fitness < b.fitness ? 1 : -1))

    const k = Math.floor(Math.random() * Math.min(5, layers[n].length * 0.3))

    return layers[n][k]
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
