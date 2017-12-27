import { getAll } from './read'
import type { AncestorTree } from '../type'

export const getBestFitness = (tree: AncestorTree) =>
    tree.children.reduce(
        (min, tree) => Math.min(min, getBestFitness(tree)),
        tree.fitness
    )

export const getBestFitLeafs = (tree: AncestorTree, n: number = 1) =>
    getAll(tree)
        .sort((a, b) => (a.fitness < b.fitness ? 1 : -1))
        .slice(0, n)
