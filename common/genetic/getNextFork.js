import type { AncestorTree } from 'type'
import { HORIZONTAL_TRIAL, N_CIRCLE, GENE_BATCH } from './config'

const extractNDepth = (tree: AncestorTree, n: number): AncestorTree[] =>
    n == 0
        ? [tree]
        : [].concat(...tree.children.map(x => extractNDepth(x, n - 1)))

export const getNextFork = (tree: AncestorTree): AncestorTree => {
    const path = []

    const N_layer = Math.ceil(N_CIRCLE / GENE_BATCH)

    // format the tree as a list on layer
    // a layer is a list of all solution at the depth N
    const layers = Array.from({ length: N_layer }, (_, i) =>
        extractNDepth(tree, i)
    )

    // chose the layer
    // two phase:
    //   first fill all the layer,
    //   before going to the N+1 layer, the N layer should have at least HORIZONTAL_TRIAL
    //
    //   second phase: pick a random layer
    //   in this phase, the final layaer have more probability to be picked
    let n = 0
    if (layers[N_layer - 1].length < HORIZONTAL_TRIAL) {
        for (n = 0; layers[n + 1].length >= HORIZONTAL_TRIAL; n++);
    } else {
        n = Math.min(
            Math.round(Math.random() * layers.length * 1.4),
            layers.length - 1
        )
    }

    // chose an item in this layer
    // the solution is chosen randomly between the 5 better
    const solutions = layers[n].sort((a, b) => (a.fitness < b.fitness ? -1 : 1))

    const k = Math.floor(Math.random() * Math.min(5, solutions.length * 0.3))

    return solutions[k]
}
