import { HORIZONTAL_TRIAL, N_CIRCLE, GENE_BATCH } from './config'
import { randFibo, randInt } from '../util/math'
import type { AncestorTree } from 'type'

const extractNDepth = (tree: AncestorTree, n: number): AncestorTree[] =>
    n == 0
        ? [tree]
        : [].concat(...tree.children.map(x => extractNDepth(x, n - 1)))

const sort = arr => arr.sort((a, b) => (a.fitness < b.fitness ? 1 : -1))

export const getNextFork = (tree: AncestorTree): AncestorTree => {
    const path = []

    const N_layer = Math.ceil(N_CIRCLE / GENE_BATCH)

    // format the tree as a list on layer
    // a layer is a list of all solution at the depth N
    const layers = Array.from({ length: N_layer }, (_, i) =>
        extractNDepth(tree, i)
    )
        .map(arr => (arr.length < HORIZONTAL_TRIAL ? null : arr))
        .filter(Boolean)

    const layer = sort(layers[randFibo(layers.length)])

    // chose an item in this layer
    // the solution is chosen randomly between the 5 better
    const n = Math.min(5, layer.length * 0.4)
    const k = randInt(n)

    return layer[k]
}
