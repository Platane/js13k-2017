import type { AncestorTree } from '../type'

export const getDepth = (tree: AncestorTree) =>
    tree.children.reduce((max, tree) => Math.max(max, getDepth(tree)), 0) + 1

export const getBestFitness = (tree: AncestorTree) =>
    tree.children.reduce(
        (min, tree) => Math.min(min, getBestFitness(tree)),
        tree.fitness
    )

export const getAll = (tree: AncestorTree) =>
    tree.children.reduce((arr, tree) => [...arr, ...getAll(tree)], [tree])

export const getBestFitLeafs = (tree: AncestorTree, n: number = 1) =>
    getAll(tree)
        .sort((a, b) => (a.fitness < b.fitness ? 1 : -1))
        .slice(0, n)

export const count = (tree: AncestorTree) =>
    tree.children.reduce((sum, tree) => sum + count(tree), 0) + 1

export const getNodeById = (
    tree: AncestorTree,
    id: String
): AncestorTree | null =>
    tree.id === id ? tree : tree.children.find(t => getNodeById(t, id))

export const extractByDepth = (
    tree: AncestorTree,
    n: number = 0,
    acc = []
): AncestorTree[][] => {
    ;(acc[n] = acc[n] || []).push(tree)

    tree.children.forEach(t => extractByDepth(t, n + 1, acc))

    return acc
}
