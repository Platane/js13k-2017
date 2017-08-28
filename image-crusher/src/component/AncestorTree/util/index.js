import type { AncestorTree } from '../../../type'

type Tree = { children: Tree[] }

const build = (map, x, y, tree) => {
    if (tree.children.length === 0) {
        map.set(tree, { x, y })
        return x + 1
    } else {
        const _x = x
        tree.children.forEach(tree => (x = build(map, x, y + 1, tree)))
        map.set(tree, { x: (x + _x - 1) / 2, y })
        return x
    }
}

export const computePosition = (tree: Tree) => {
    const leafX = new Map()
    build(leafX, 0, 0, tree)

    return leafX
}
