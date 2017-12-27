import { HORIZONTAL_TRIAL, N_CIRCLE, GENE_BATCH } from './config'
import { randomWithDistribution, randInt } from '../util/math'
import { extractByDepth } from '../ancestorTree/read'
import type { AncestorTree } from 'type'

const extractNDepth = (tree: AncestorTree, n: number): AncestorTree[] =>
    n == 0
        ? [tree]
        : [].concat(...tree.children.map(x => extractNDepth(x, n - 1)))

const f = n => (n == 0 && 1) || (n == 1 && 1) || f(n - 1) + f(n - 2)

const sort = arr => arr.sort((a, b) => (a.fitness < b.fitness ? 1 : -1))

export const getNextFork = (tree: AncestorTree): AncestorTree => {
    // format the tree as a list on layer
    // a layer is a list of all solution at the depth N
    const layers = extractByDepth(tree)

    const N = Math.ceil(N_CIRCLE / GENE_BATCH) + 1

    // the N+1 layer is available once the previous one has enougth trial
    if (layers.length === 1) layers.push([])

    if (
        layers[layers.length - 1].length > HORIZONTAL_TRIAL &&
        layers.length < N
    )
        layers.push([])

    const distribution = layers.map((arr, i) => f(i + 2) / (arr.length + 1))
    distribution[0] = 0

    const a = randomWithDistribution(distribution)() - 1

    const layer = sort(layers[a])

    // chose an item in this layer
    // the solution is chosen randomly between the 5 better
    const n = Math.min(5, Math.floor(layer.length * 0.4))
    const k = randInt(n)

    return layer[k]
}
