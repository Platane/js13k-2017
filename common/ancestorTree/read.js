import type { AncestorTree } from '../type'

export const getDepth = (tree: AncestorTree) =>
    tree.children.reduce((max, tree) => Math.max(max, getDepth(tree)), 0) + 1

export const getAll = (tree: AncestorTree) =>
    tree.children.reduce((arr, tree) => [...arr, ...getAll(tree)], [tree])

export const count = (tree: AncestorTree) =>
    tree.children.reduce((sum, tree) => sum + count(tree), 0) + 1

export const getNodeById = (
    tree: AncestorTree,
    id: String
): AncestorTree | null =>
    tree.id === id
        ? tree
        : tree.children.reduce((x, t) => x || getNodeById(t, id), null)

export const extractByDepth = (
    tree: AncestorTree,
    n: number = 0,
    acc = []
): AncestorTree[][] => {
    ;(acc[n] = acc[n] || []).push(tree)

    tree.children.forEach(t => extractByDepth(t, n + 1, acc))

    return acc
}
