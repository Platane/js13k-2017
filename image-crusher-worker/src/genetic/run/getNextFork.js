import type { Param, ADN, AncestorTree } from '../../type'
import { HORIZONTAL_TRIAL, N_CIRCLE, GENE_BATCH } from '../../config/param'

const extractNDepth = (tree: AncestorTree, n: number): AncestorTree[] =>
    n == 0
        ? [tree]
        : [].concat(...tree.children.map(x => extractNDepth(x, n - 1)))

export const getNextFork = (tree: AncestorTree): AncestorTree => {
    const path = []

    const layers = Array.from(
        { length: Math.ceil(N_CIRCLE / GENE_BATCH) },
        (_, i) => extractNDepth(tree, i)
    )

    let n = 0
    if (layers[layers.length - 1].length < HORIZONTAL_TRIAL) {
        for (n = 0; layers[n + 1].length >= HORIZONTAL_TRIAL; n++);
    } else {
        n = Math.min(
            Math.round(Math.random() * layers.length * 1.4),
            layers.length - 1
        )
    }

    layers[n].sort((a, b) => (a.fitness < b.fitness ? 1 : -1))

    const k = Math.floor(Math.random() * Math.min(5, layers[n].length * 0.3))

    return layers[n][k]
}
