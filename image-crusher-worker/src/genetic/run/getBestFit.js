import type { Param, ADN, AncestorTree } from '../../type'

const getLeaves = (tree: AncestorTree) =>
    tree.children.length === 0
        ? [tree]
        : [].concat(...tree.children.map(getLeaves))

export const getBestFit = (tree: AncestorTree): ADN =>
    getLeaves(tree).reduce(
        (best, x) => (!best || best.fitness > x.fitness ? x : best),
        null
    ).adn
